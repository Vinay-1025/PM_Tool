import "./PlanningView.css";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const PlanningView = () => {
  return (
    <div className="planningView">
      <h3>My Planning – January 2026</h3>

      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {days.map(d => (
            <tr key={d}>
              <td>{Math.ceil(d / 7)}</td>
              <td>{d}-01-2026</td>
              <td>-</td>
              <td>
                <button className="editBtn">✎</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanningView;
