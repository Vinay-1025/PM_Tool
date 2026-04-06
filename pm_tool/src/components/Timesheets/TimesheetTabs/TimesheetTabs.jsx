import {
  FiClock,
  FiList,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import "./TimesheetTabs.css";

const tabs = [
  { id: "add", label: "Add Timesheet", icon: FiClock },
  { id: "manage", label: "Manage Timesheet", icon: FiList },
  { id: "holidays", label: "Holidays", icon: FiCalendar },
  { id: "approve", label: "Approve Timesheet", icon: FiCheckCircle },
];

const TimesheetTabs = ({ active, onChange }) => {
  return (
    <div className="timesheetTabs">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            className={`timesheetTab ${isActive ? "active" : ""}`}
            onClick={() => onChange(id)}
          >
            <Icon className="timesheetTab-icon" />
            <span className="timesheetTab-label">{label}</span>

            {isActive && <span className="timesheetTab-indicator" />}
          </button>
        );
      })}
    </div>
  );
};

export default TimesheetTabs;
