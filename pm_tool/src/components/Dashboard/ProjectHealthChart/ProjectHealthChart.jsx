import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FiMoreHorizontal } from "react-icons/fi";
import "./ProjectHealthChart.css";

const data = [
  { name: "On Track", value: 3, color: "var(--success-color)" },
  { name: "At Risk", value: 1, color: "var(--warning-color)" },
  { name: "Delayed", value: 1, color: "var(--error-color)" },
];

const ProjectHealthChart = () => {
  return (
    <div className="health-card">
      <div className="health-header">
        <div>
          <h4 className="health-title">Project Health</h4>
          <span className="health-subtitle">
            Overall project status
          </span>
        </div>

        <button className="health-action">
          <FiMoreHorizontal />
        </button>
      </div>

      <div className="health-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="health-legend">
          {data.map((item) => (
            <div key={item.name} className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectHealthChart;
