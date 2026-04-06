import { useState } from "react";
import TimesheetTabs from "../../components/Timesheets/TimesheetTabs/TimesheetTabs";
import AddTimesheet from "../../components/Timesheets/AddTimesheet/AddTimesheet";
import ManageTimesheet from "../../components/Timesheets/ManageTimesheet/ManageTimesheet";
import Holidays from "../../components/Timesheets/Holidays/Holidays";
import ApproveTimesheet from "../../components/Timesheets/ApproveTimesheet/ApproveTimesheet";
import "./Timesheets.css";

const Timesheets = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="timesheets-page">
      <TimesheetTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "add" && <AddTimesheet />}
      {activeTab === "manage" && <ManageTimesheet />}
      {activeTab === "holidays" && <Holidays />}
      {activeTab === "approve" && <ApproveTimesheet />}
    </div>
  );
};

export default Timesheets;
