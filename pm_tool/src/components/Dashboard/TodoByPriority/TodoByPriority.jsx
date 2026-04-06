import "./TodoByPriority.css";

const data = [
  { team: "Accelyzei Website", high: 1, medium: 1, low: 0 },
  { team: "Bill Stack", high: 0, medium: 0, low: 0 },
];

const TodoByPriority = () => {
  return (
    <div className="todoPriority-card">
      <h4 className="todoPriority-title">Todo Summary by Priority</h4>

      <table className="todoPriority-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>High</th>
            <th>Medium</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.team}>
              <td>{row.team}</td>
              <td className="high">{row.high || "—"}</td>
              <td className="medium">{row.medium || "—"}</td>
              <td className="low">{row.low || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoByPriority;
