import { useState } from "react";
import { FiCheck, FiX, FiEye } from "react-icons/fi";
import ApprovalDrawer from "./ApprovalDrawer";
import "./ApproveTimesheet.css";

const approvals = [
  {
    id: 1,
    employee: "James Wilson",
    initials: "JW",
    avatar: "",
    date: "12 Mar 2024",
    project: "E-Commerce Platform",
    hours: "5h",
    description: "JWT authentication & API integration",
    status: "Pending",
  },
  {
    id: 2,
    employee: "David Kim",
    initials: "DK",
    avatar: "",
    date: "11 Mar 2024",
    project: "Mobile App",
    hours: "4h",
    description: "Login UI & validation",
    status: "Pending",
  },
];

const ApproveTimesheet = () => {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);

  const toggleSelect = id =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

  return (
    <div className="approveTimesheet-page">
      {selected.length > 0 && (
        <div className="bulk-bar">
          <span>{selected.length} selected</span>
          <div className="bulk-actions">
            <button className="approve">
              <FiCheck /> Approve
            </button>
            <button className="reject">
              <FiX /> Reject
            </button>
          </div>
        </div>
      )}

      <div className="approveTimesheet-card">
        <table className="approveTimesheet-table">
          <thead>
            <tr>
              <th />
              <th>Employee</th>
              <th>Date</th>
              <th>Project</th>
              <th>Hours</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {approvals.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>

                <td>
                  <div className="employee-cell">
                    <div className="avatar">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.employee} />
                      ) : (
                        item.initials
                      )}
                    </div>
                    <span>{item.employee}</span>
                  </div>
                </td>

                <td>{item.date}</td>
                <td>{item.project}</td>
                <td className="hours">{item.hours}</td>

                <td>
                  <span className="status-pill pending">Pending</span>
                </td>

                <td>
                  <button
                    className="icon-btn"
                    onClick={() => setActive(item)}
                    title="View details"
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ApprovalDrawer data={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default ApproveTimesheet;
