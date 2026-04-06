import {
  FiFolder,
  FiUpload,
  FiGrid,
  FiClock,
} from "react-icons/fi";
import "./DocumentsTabs.css";

const tabs = [
  { id: "all", label: "All Documents", icon: <FiFolder /> },
  { id: "upload", label: "Upload", icon: <FiUpload /> },
  { id: "categories", label: "Categories", icon: <FiGrid /> },
  { id: "versions", label: "Version History", icon: <FiClock /> },
];

const DocumentsTabs = ({ active, onChange }) => {
  return (
    <div className="documentsTabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`documentsTab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DocumentsTabs;
