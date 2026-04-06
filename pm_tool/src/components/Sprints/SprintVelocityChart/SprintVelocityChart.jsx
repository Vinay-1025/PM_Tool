import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import "./SprintVelocityChart.css";

const data = [
  { sprint: "S5", points: 45 },
  { sprint: "S6", points: 52 },
  { sprint: "S7", points: 68 },
];

const SprintVelocityChart = () => (
  <section className="chart-card">
    <h4>Team Velocity</h4>
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="sprint" />
          <Tooltip />
          <Bar dataKey="points" fill="var(--primary-color)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default SprintVelocityChart;
