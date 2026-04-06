import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FiMoreHorizontal } from "react-icons/fi";
import "./TeamUtilizationChart.css";

const data = [
  { week: "W1", utilization: 65 },
  { week: "W2", utilization: 70 },
  { week: "W3", utilization: 68 },
  { week: "W4", utilization: 75 },
  { week: "W5", utilization: 80 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="teamUtil-tooltip">
        <span className="teamUtil-tooltipLabel">Utilization</span>
        <strong>{payload[0].value}%</strong>
      </div>
    );
  }
  return null;
};

const TeamUtilizationChart = () => {
  return (
    <div className="teamUtil-card">
      <div className="teamUtil-header">
        <div>
          <h4 className="teamUtil-title">Team Utilization</h4>
          <span className="teamUtil-subtitle">
            Weekly team capacity utilization
          </span>
        </div>

        <button className="teamUtil-action">
          <FiMoreHorizontal />
        </button>
      </div>

      <div className="teamUtil-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="utilGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.04}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
            />

            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              domain={[0, 100]}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="utilization"
              stroke="var(--primary-color)"
              fill="url(#utilGradient)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamUtilizationChart;
