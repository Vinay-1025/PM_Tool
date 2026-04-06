import {
  FiEye,
  FiRotateCcw,
  FiBarChart2,
} from "react-icons/fi";
import "./ReleaseTable.css";

const ReleaseTable = ({ title, data, variant }) => {
  return (
    <div className="releaseTable-card">
      <h4>{title}</h4>

      <div className="releaseTable-wrap">
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
            {data.map(r => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.project}</td>
                <td>{r.external}</td>
                <td>{r.internal}</td>
                <td>{r.start}</td>
                <td>{r.end}</td>

                <td>
                  <span
                    className={`status-pill ${r.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {r.status}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <FiEye title="View Details" />
                    {variant === "executed" && (
                      <>
                        <FiBarChart2 title="View Metrics" />
                        <FiRotateCcw title="Rollback" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReleaseTable;
