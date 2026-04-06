import { useState } from "react";
import "./TaskDateChangeModal.css";

const TaskDateChangeModal = ({ open, onClose, onConfirm }) => {
  const [comment, setComment] = useState("");

  if (!open) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>Reason for rescheduling</h3>

        <textarea
          placeholder="Enter reason for changing task date..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          autoFocus
        />

        <div className="modalActions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="primary"
            disabled={!comment.trim()}
            onClick={() => {
              onConfirm(comment);
              setComment("");
            }}
          >
            Confirm Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDateChangeModal;
