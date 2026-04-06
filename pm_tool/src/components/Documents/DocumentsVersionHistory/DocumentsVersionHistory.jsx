import { FiEye } from "react-icons/fi";
import "./DocumentsVersionHistory.css";

const versions = [
  {
    name: "Project Requirements.pdf",
    version: "v3",
    total: 3,
    updated: "15/01/2024",
  },
  {
    name: "UI Design Specs.pdf",
    version: "v2",
    total: 2,
    updated: "10/02/2024",
  },
  {
    name: "Sprint Report.pdf",
    version: "v1",
    total: 1,
    updated: "04/03/2024",
  },
];

const DocumentsVersionHistory = () => {
  return (
    <div className="versionHistory-card">
      <h3>Document Version History</h3>

      <table className="versionHistory-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Current Version</th>
            <th>Total Versions</th>
            <th>Last Updated</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {versions.map(v => (
            <tr key={v.name}>
              <td className="doc-name">{v.name}</td>

              <td>
                <span className="version-badge">{v.version}</span>
              </td>

              <td>{v.total}</td>
              <td>{v.updated}</td>

              <td>
                <button className="view-btn">
                  <FiEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsVersionHistory;
