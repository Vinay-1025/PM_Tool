import {
  FiClock,
  FiCalendar,
  FiLogOut,
  FiCheckCircle,
} from "react-icons/fi";
import "./MonthlySummary.css";

const MonthlySummary = ({ summary }) => {
  // ✅ Safe fallback
  const safeSummary = {
    days: summary?.days ?? 0,
    hours: summary?.hours ?? "0h",
    leaves: summary?.leaves ?? 0,
    holidays: summary?.holidays ?? 0,
  };

  return (
    <div className="monthlySummary">
      <div className="summaryCard">
        <FiCalendar />
        <div>
          <span>Total Days</span>
          <strong>{safeSummary.days}</strong>
        </div>
      </div>

      <div className="summaryCard">
        <FiClock />
        <div>
          <span>Total Hours</span>
          <strong>{safeSummary.hours}</strong>
        </div>
      </div>

      <div className="summaryCard">
        <FiLogOut />
        <div>
          <span>Leaves</span>
          <strong>{safeSummary.leaves}</strong>
        </div>
      </div>

      <div className="summaryCard">
        <FiCheckCircle />
        <div>
          <span>Holidays</span>
          <strong>{safeSummary.holidays}</strong>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
