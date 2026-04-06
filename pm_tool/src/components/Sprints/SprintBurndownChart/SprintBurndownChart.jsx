import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import "./SprintBurndownChart.css";

const data = [
  { day: "Day 1", remaining: 40 },
  { day: "Day 5", remaining: 32 },
  { day: "Day 10", remaining: 18 },
  { day: "Day 15", remaining: 5 },
];

const SprintBurndownChart = () => (
  <section className="chart-card">
    <h4>Burndown Chart</h4>
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="remaining"
            stroke="var(--accent-color)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default SprintBurndownChart;
