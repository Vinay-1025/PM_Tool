import { useState } from "react";
import "./DrawerShared.css";
import { FiX } from "react-icons/fi";

const CreateReleaseDrawer = ({ open, onClose, project }) => {
    if (!open) return null;

    return (
        <div className="drawer-backdrop" onClick={onClose}>
            <div className="drawer-container" onClick={e => e.stopPropagation()}>
                <header className="drawer-header">
                    <div>
                        <h2>Draft Release Target</h2>
                        <p className="drawer-subtitle">Project: {project?.name}</p>
                    </div>
                    <button className="drawer-close" onClick={onClose}><FiX /></button>
                </header>
                <div className="drawer-body">
                    <div className="form-group">
                        <label>Version Name</label>
                        <input type="text" placeholder="e.g. v2.1.0-beta" />
                    </div>
                    <div className="form-group">
                        <label>Release Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label>Release Notes</label>
                        <textarea placeholder="Describe features going into this release..." rows={4}></textarea>
                    </div>
                </div>
                <footer className="drawer-footer">
                    <button className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={onClose}>Publish Release</button>
                </footer>
            </div>
        </div>
    );
};

export default CreateReleaseDrawer;
