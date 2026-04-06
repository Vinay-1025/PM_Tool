import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import "./ManageReleases.css";

const releases = [
  {
    id: "R-001",
    title: "E-Commerce Platform – Sprint 3",
    project: "E-Commerce Platform Redesign",
    external: 120,
    internal: 80,
    start: "01/03/2024",
    end: "15/03/2024",
    status: "Active",
  },
  {
    id: "R-002",
    title: "Mobile App – Sprint 1",
    project: "Mobile App Development",
    external: 80,
    internal: 60,
    start: "01/04/2024",
    end: "14/04/2024",
    status: "Planned",
  },
];

const ManageReleases = () => {
  return (
    <div className="manageReleases-card">
      <h4>Manage Releases</h4>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Ext (hrs)</th>
            <th>Int (hrs)</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {releases.map(r => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.project}</td>
              <td>{r.external}</td>
              <td>{r.internal}</td>
              <td>{r.start}</td>
              <td>{r.end}</td>
              <td>
                <span className={`status-pill ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </td>
              <td className="actions">
                <FiEye />
                <FiEdit />
                <FiTrash2 />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReleases;
