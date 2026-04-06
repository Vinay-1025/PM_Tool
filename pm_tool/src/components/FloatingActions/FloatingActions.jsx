import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiCheckSquare,
  FiFolder,
  FiClock,
  FiFileText,
  FiX,
} from "react-icons/fi";
import "./FloatingActions.css";

const actions = [
  {
    label: "Add Todo",
    icon: FiCheckSquare,
    path: "/tasks",
  },
  {
    label: "Add Project",
    icon: FiFolder,
    path: "/projects",
  },
  {
    label: "Add Timesheet",
    icon: FiClock,
    path: "/timesheets",
  },
  {
    label: "Add Document",
    icon: FiFileText,
    path: "/documents",
  },
];

const FloatingActions = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className={`fab ${open ? "open" : ""}`}>
      <div className="fab-actions">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="fab-action"
              onClick={() => handleAction(action.path)}
            >
              <Icon />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      <button
        className="fab-main"
        onClick={() => setOpen(!open)}
        aria-label="Quick actions"
      >
        {open ? <FiX /> : <FiPlus />}
      </button>
    </div>
  );
};

export default FloatingActions;
