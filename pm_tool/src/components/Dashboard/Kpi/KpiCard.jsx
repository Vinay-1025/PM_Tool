import "./KpiCard.css";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const KpiCard = ({ title, value, trend, trendType, icon: Icon }) => {
  return (
    <div className="kpiCard-card">
      <div className="kpiCard-header">
        <span className="kpiCard-title">{title}</span>

        <div className={`kpiCard-icon ${trendType}`}>
          <Icon />
        </div>
      </div>

      <div className="kpiCard-value">{value}</div>

      <div className={`kpiCard-trend ${trendType}`}>
        {trendType === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        <span>{trend}</span>
        <span className="kpiCard-trendText">vs last month</span>
      </div>
    </div>
  );
};

export default KpiCard;
