import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("✅ AZ_PM Extension Activated");

  /**
   * Register URI handler
   * This receives redirects like:
   * vscode://az-pm-tool/auth?connected=true
   */
  const uriHandler = vscode.window.registerUriHandler({
    handleUri(uri: vscode.Uri) {
      console.log("🔁 VS Code OAuth Callback:", uri.toString());

      const params = new URLSearchParams(uri.query);

      if (params.get("connected") === "true") {
        vscode.window.showInformationMessage(
          "AZ_PM: GitHub connected successfully 🎉"
        );
      } else {
        vscode.window.showErrorMessage(
          "AZ_PM: GitHub connection failed"
        );
      }
    }
  });

  /**
   * Login command
   */
  const loginCmd = vscode.commands.registerCommand(
    "azpm.login",
    async () => {
      try {
        // VS Code deep link callback
        const callbackUri = await vscode.env.asExternalUri(
          vscode.Uri.parse("vscode://az-pm-tool/auth")
        );

        // Backend VS Code OAuth route (PUBLIC)
        const backendUrl =
          `http://localhost:5000/api/v1/integrations/github/vscode/connect` +
          `?redirect=${encodeURIComponent(callbackUri.toString())}`;

        await vscode.env.openExternal(
          vscode.Uri.parse(backendUrl)
        );

        vscode.window.showInformationMessage(
          "AZ_PM: Opening GitHub login..."
        );
      } catch (err) {
        console.error("❌ Login error:", err);
        vscode.window.showErrorMessage(
          "AZ_PM: Failed to start GitHub login"
        );
      }
    }
  );

  context.subscriptions.push(loginCmd, uriHandler);
}

export function deactivate() {
  console.log("❌ AZ_PM Extension Deactivated");
}
