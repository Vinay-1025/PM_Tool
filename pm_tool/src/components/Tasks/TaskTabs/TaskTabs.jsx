import {
  FiCalendar,
  FiPlus,
  FiUser,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { BsCalendar3, BsInfoSquare } from "react-icons/bs";
import "./TaskTabs.css";
import { FaTintSlash } from "react-icons/fa";

const tabs = [
  { id: "calendar", label: "Calendar", icon: <FiCalendar /> },
  { id: "create", label: "Create Todo", icon: <FiPlus /> },
  { id: "my", label: "My Todos", icon: <FiUser /> },
  { id: "added", label: "Added by Me", icon: <FiUsers /> },
  { id: "manage", label: "Manage Todos", icon: <FiSettings /> },
  { id: "planning", label: "Planning", icon: <BsCalendar3 /> },
  { id: "kandan", label: "Kandan", icon: <BsInfoSquare /> },
];

const TaskTabs = ({ active, onChange }) => {
  return (
    <div className="taskTabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`taskTab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;
