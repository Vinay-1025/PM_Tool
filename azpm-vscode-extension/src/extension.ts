import * as vscode from 'vscode';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // Should be configurable
let activeSessionId: string | null = null;
let activeTaskId: string | null = null;
let authToken: string | null = null;

// Telemetry Buffers
let activityBuffer: any[] = [];
let lastActivityTime = Date.now();
let fileStats: Record<string, { activeMs: number, idleMs: number, linesModified: number }> = {};

export async function activate(context: vscode.ExtensionContext) {
    console.log('AZPM Tracker is now active!');

    // 1. Setup API / Auth configuration in a real app via settings or prompt
    authToken = await getAuthToken();
    if (!authToken) {
        vscode.window.showInformationMessage("AZPM: Please configure your Auth Token to start tracking.");
    }

    // 2. Commands Setup
    let cmdStart = vscode.commands.registerCommand('azpm.startSession', async () => {
        vscode.window.showInformationMessage('AZPM Session Started!');
        await startSession();
    });

    let cmdAssign = vscode.commands.registerCommand('azpm.assignTask', async () => {
        const tasks = await fetchTasks();
        const selection = await vscode.window.showQuickPick(tasks.map((t: any) => `${t.taskKey}: ${t.title}`));
        if (selection) {
            activeTaskId = selection.split(':')[0]; // get taskKey
            vscode.window.showInformationMessage(`Currently tracking: ${activeTaskId}`);
        }
    });

    context.subscriptions.push(cmdStart, cmdAssign);

    // 3. File Activity Trackers
    vscode.workspace.onDidChangeTextDocument(e => {
        lastActivityTime = Date.now();
        const file = e.document.fileName;

        if (!fileStats[file]) {
            fileStats[file] = { activeMs: 0, idleMs: 0, linesModified: 0 };
        }
        fileStats[file].linesModified += e.contentChanges.length;
    });

    // Track time allocation per file (simplistic interval)
    setInterval(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const file = editor.document.fileName;
            if (!fileStats[file]) fileStats[file] = { activeMs: 0, idleMs: 0, linesModified: 0 };

            const timeSinceActivity = Date.now() - lastActivityTime;
            if (timeSinceActivity < 30000) {
                fileStats[file].activeMs += 1000;
            } else {
                fileStats[file].idleMs += 1000;
            }
        }
    }, 1000);

    // 4. Batch sender
    setInterval(async () => {
        await sendTelemetry();
    }, 60000); // Try every 60s

    // 5. Git Hook / Commit Intercept
    interceptGitCommit();
}

async function startSession() {
    if (!authToken) return;
    try {
        const res = await axios.post(`${API_URL}/vscode/session/start`, {
            workspace: vscode.workspace.name || 'Unknown',
            taskId: activeTaskId
        }, { headers: { Authorization: `Bearer ${authToken}` } });
        activeSessionId = res.data.sessionId;
    } catch (e) { console.error('AZPM Start Session Error', e); }
}

async function fetchTasks() {
    // Mock fallback logic; would make API call
    return [{ title: 'Design DB Schema', taskKey: 'AZPM-001' }];
}

async function sendTelemetry() {
    if (!authToken || !activeSessionId) return;

    const activities = Object.keys(fileStats).map(file => ({
        filePath: file,
        language: file.split('.').pop() || 'unknown',
        durationMs: fileStats[file].activeMs + fileStats[file].idleMs,
        activeTypingMs: fileStats[file].activeMs,
        idleDurationMs: fileStats[file].idleMs,
        linesModifiedCount: fileStats[file].linesModified,
        taskId: activeTaskId
    }));

    if (activities.length === 0) return;

    try {
        await axios.post(`${API_URL}/vscode/activity/files`, { activities },
            { headers: { Authorization: `Bearer ${authToken}` } });

        // Heartbeat
        await axios.post(`${API_URL}/vscode/session/heartbeat`, { sessionId: activeSessionId },
            { headers: { Authorization: `Bearer ${authToken}` } });

        // Clear buffer after successful send
        fileStats = {};
    } catch (e) { console.error("Telemetry push failed"); }
}

async function getAuthToken() {
    return vscode.workspace.getConfiguration('azpm').get<string>('authToken');
}

function interceptGitCommit() {
    // Fetch built-in git extension
    const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
    if (!gitExtension) return;

    const api = gitExtension.getAPI(1);
    if (api.repositories.length > 0) {
        const repo = api.repositories[0];

        // Watch for commit input box changes to prepend task ID
        repo.inputBox.onDidChange((value: string) => {
            if (activeTaskId && value.length === 1 && !value.includes(`[${activeTaskId}]`)) {
                repo.inputBox.value = `[${activeTaskId}] ${value}`;
            }
        });
    }
}

export function deactivate() {
    // Flush telemetry on exit
    sendTelemetry();
}
