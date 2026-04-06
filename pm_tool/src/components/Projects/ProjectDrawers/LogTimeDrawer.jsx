import { useState } from "react";
import "./DrawerShared.css";
import { FiX } from "react-icons/fi";

const LogTimeDrawer = ({ open, onClose, project }) => {
    if (!open) return null;

    return (
        <div className="drawer-backdrop" onClick={onClose}>
            <div className="drawer-container" onClick={e => e.stopPropagation()}>
                <header className="drawer-header">
                    <div>
                        <h2>Log Work Time</h2>
                        <p className="drawer-subtitle">Auto-linked: {project?.name}</p>
                    </div>
                    <button className="drawer-close" onClick={onClose}><FiX /></button>
                </header>
                <div className="drawer-body">
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-group row">
                        <div style={{ flex: 1 }}>
                            <label>Time Spent (Hours)</label>
                            <input type="number" placeholder="2h" step="0.5" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Work Description</label>
                        <textarea placeholder="What did you work on?" rows={4}></textarea>
                    </div>
                </div>
                <footer className="drawer-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onClose}>Submit Logs</button>
                </footer>
            </div>
        </div>
    );
};

export default LogTimeDrawer;
