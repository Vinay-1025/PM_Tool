import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TeamAnalytics.css";

const data = [
  { name: "Planned", value: 80 },
  { name: "Used", value: 65 },
];

const TeamAnalytics = () => {
  return (
    <div className="teamAnalytics">
      <h4>Team Analytics</h4>

      <div className="teamAnalytics-chart">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="var(--primary-color)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamAnalytics;
