import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductivityDashboard.css";

const ProductivityDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // MOCK data to demonstrate the dynamic premium UI visually.
                // In reality, this links to: axios.get('/api/v1/metrics/productivity/me')
                setTimeout(() => {
                    setData({
                        overview: {
                            score: 92,
                            totalActiveHours: "34.5",
                            focusRatio: "78.2%",
                            codeChurnRatio: "0.14",
                            totalLinesModified: 2450,
                            totalLinesAdded: 840,
                            totalLinesRemoved: 120
                        },
                        github: { commits: 45, prsOpened: 5, prsMerged: 4, reviews: 12 }
                    });
                    setLoading(false);
                }, 1500);
            } catch (err) {
                console.error("Dashboard error", err);
            }
        };
        fetchMetrics();
    }, []);

    if (loading) {
        return (
            <div className="prod-loader-container">
                <div className="prod-spinner"></div>
                <p>Crunching telemetry...</p>
            </div>
        );
    }

    return (
        <div className="prod-dashboard-container">
            <header className="prod-header">
                <h1>Developer Intelligence Hub</h1>
                <p>Real-time analytics correlated from VS Code & GitHub</p>
            </header>

            <div className="prod-grid">
                {/* Main Score Card */}
                <div className="prod-card glassmorphism score-card">
                    <h2>Productivity Score</h2>
                    <div className="score-ring">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle"
                                strokeDasharray={`${data.overview.score}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="score-text">{data.overview.score}</div>
                    </div>
                    <p className="insight-text">Top 15% in Engineering Team</p>
                </div>

                {/* IDE Telemetry Stats */}
                <div className="prod-card glassmorphism tech-card">
                    <h2><i className="fa-solid fa-code"></i> VS Code Telemetry</h2>
                    <div className="stat-row">
                        <span className="stat-label">Deep Work (Active)</span>
                        <span className="stat-value highlight">{data.overview.totalActiveHours} hrs</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Focus Ratio</span>
                        <span className="stat-value">{data.overview.focusRatio}</span>
                    </div>
                    <div className="stat-row">
                        <span className="stat-label">Lines Touched</span>
                        <span className="stat-value">{data.overview.totalLinesModified}</span>
                    </div>
                </div>

                {/* GitHub Stats */}
                <div className="prod-card glassmorphism gh-card">
                    <h2><i className="fa-brands fa-github"></i> Source Control</h2>
                    <div className="gh-grid">
                        <div className="gh-metric">
                            <div className="gh-val">{data.github.commits}</div>
                            <div className="gh-lbl">Commits</div>
                        </div>
                        <div className="gh-metric">
                            <div className="gh-val">{data.github.prsMerged}</div>
                            <div className="gh-lbl">PRs Merged</div>
                        </div>
                        <div className="gh-metric">
                            <div className="gh-val">{data.github.reviews}</div>
                            <div className="gh-lbl">Reviews</div>
                        </div>
                        <div className="gh-metric">
                            <div className="gh-val">{data.overview.codeChurnRatio}</div>
                            <div className="gh-lbl">Churn</div>
                        </div>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: '85%' }}></div>
                    </div>
                    <p className="insight-text">High merge efficiency detected.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductivityDashboard;
