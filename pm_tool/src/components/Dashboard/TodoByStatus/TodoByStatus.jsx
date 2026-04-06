import "./TodoByStatus.css";

const data = [
  {
    team: "Accelyzei Website",
    open: 1,
    inProgress: 0,
    completed: 0,
  },
  {
    team: "Bill Stack",
    open: 0,
    inProgress: 0,
    completed: 0,
  },
];

const TodoByStatus = () => {
  return (
    <div className="todoStatus-card">
      <h4 className="todoStatus-title">Todo Summary by Status</h4>

      <table className="todoStatus-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Open</th>
            <th>In Progress</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.team}>
              <td>{row.team}</td>
              <td className="open">{row.open || "—"}</td>
              <td className="progress">{row.inProgress || "—"}</td>
              <td className="done">{row.completed || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoByStatus;
