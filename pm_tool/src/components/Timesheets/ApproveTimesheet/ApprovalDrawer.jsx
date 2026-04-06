import { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import AuditTimeline from "./AuditTimeline";
import "./ApprovalDrawer.css";

const ApprovalDrawer = ({ data, onClose }) => {
  const [comment, setComment] = useState("");

  if (!data) return null;

  const handleAction = action => {
    if (!comment.trim()) {
      alert("Please add a comment before proceeding");
      return;
    }
    alert(`${action} with comment: ${comment}`);
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" onClick={e => e.stopPropagation()}>
        <header>
          <h3>Timesheet Details</h3>
          <button onClick={onClose}><FiX /></button>
        </header>

        <div className="drawer-content">
          <div className="detail-row"><span>Employee</span>{data.employee}</div>
          <div className="detail-row"><span>Date</span>{data.date}</div>
          <div className="detail-row"><span>Project</span>{data.project}</div>
          <div className="detail-row"><span>Hours</span>{data.hours}</div>

          <p className="description">{data.description}</p>

          <label className="comment-label">
            Comment <span>*</span>
          </label>
          <textarea
            className="comment-box"
            placeholder="Add approval / rejection comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <AuditTimeline />
        </div>

        <footer>
          <button className="reject" onClick={() => handleAction("Rejected")}>
            Reject
          </button>
          <button className="approve" onClick={() => handleAction("Approved")}>
            <FiCheck /> Approve
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default ApprovalDrawer;
