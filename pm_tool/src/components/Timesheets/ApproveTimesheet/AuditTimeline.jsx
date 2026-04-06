import "./AuditTimeline.css";

const history = [
  { text: "Submitted by employee", time: "10 Mar 2024, 09:30" },
  { text: "Reviewed by manager", time: "10 Mar 2024, 11:00" },
];

const AuditTimeline = () => (
  <div className="audit">
    <h4>Audit History</h4>
    <ul>
      {history.map((h, i) => (
        <li key={i}>
          <span className="dot" />
          <div>
            <p>{h.text}</p>
            <span>{h.time}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AuditTimeline;
