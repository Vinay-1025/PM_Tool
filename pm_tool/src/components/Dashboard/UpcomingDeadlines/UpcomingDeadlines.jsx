import { FiArrowRight, FiClock } from "react-icons/fi";
import "./UpcomingDeadlines.css";

const deadlines = [
  {
    task: "Set up CI/CD pipeline",
    project: "E-commerce Platform",
    due: "Mar 15",
    priority: "medium",
  },
  {
    task: "AWS infrastructure setup",
    project: "Cloud Migration",
    due: "Mar 18",
    priority: "high",
  },
  {
    task: "Mobile app login screen",
    project: "Mobile App",
    due: "Mar 18",
    priority: "high",
  },
];

const UpcomingDeadlines = () => {
  return (
    <div className="deadlines-card">
      <div className="deadlines-header">
        <h4>Upcoming Deadlines</h4>
        <FiArrowRight />
      </div>

      <div className="deadlines-list">
        {deadlines.map((item) => (
          <div key={item.task} className="deadlines-item">
            <div className="deadlines-info">
              <span className="deadlines-task">{item.task}</span>
              <span className="deadlines-project">{item.project}</span>
            </div>

            <div className="deadlines-meta">
              <span className={`priority ${item.priority}`}>
                {item.priority}
              </span>
              <span className="deadlines-date">
                <FiClock /> {item.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
