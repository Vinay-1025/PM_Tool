import "./ReleaseReports.css";

const stats = [
  { label: "Total Releases", value: 6 },
  { label: "Planned", value: 2 },
  { label: "Executed", value: 4 },
];

const ReleaseReports = () => {
  return (
    <div className="releaseReports">
      <h4>Release Reports</h4>

      <div className="report-cards">
        {stats.map(s => (
          <div key={s.label} className="report-card">
            <span className="label">{s.label}</span>
            <span className="value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseReports;
