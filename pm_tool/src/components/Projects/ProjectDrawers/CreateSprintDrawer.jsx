import { useState } from "react";
import "./DrawerShared.css";
import { FiX } from "react-icons/fi";

const CreateSprintDrawer = ({ open, onClose, project }) => {
    if (!open) return null;

    return (
        <div className="drawer-backdrop" onClick={onClose}>
            <div className="drawer-container" onClick={e => e.stopPropagation()}>
                <header className="drawer-header">
                    <div>
                        <h2>Create New Sprint</h2>
                        <p className="drawer-subtitle">Project: {project?.name}</p>
                    </div>
                    <button className="drawer-close" onClick={onClose}><FiX /></button>
                </header>
                <div className="drawer-body">
                    <div className="form-group">
                        <label>Sprint Name</label>
                        <input type="text" placeholder="e.g. Sprint 4" />
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" />
                    </div>
                </div>
                <footer className="drawer-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onClose}>Start Sprint</button>
                </footer>
            </div>
        </div>
    );
};

export default CreateSprintDrawer;
