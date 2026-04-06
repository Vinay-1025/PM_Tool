import {
  FiTrash2,
  FiEdit,
  FiEye,
  FiSearch,
  FiDownload,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import MonthlySummary from "./MonthlySummary";
import {
  fetchMyTimesheets,
} from "../../../store/slices/timesheetSlice";

import "./ManageTimesheet.css";

/* ================================
   CSV EXPORT (REAL DATA)
================================ */
const exportCSV = (rows) => {
  if (!rows.length) return;

  const headers = [
    "Date",
    "Status",
    "From",
    "To",
    "Total",
    "Description",
  ];

  const csvRows = rows.map(r =>
    [
      r.date,
      r.workStatus,
      r.fromTime || "-",
      r.toTime || "-",
      r.totalTime || "-",
      r.description || "",
    ].join(",")
  );

  const csv = [headers.join(","), ...csvRows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "monthly_timesheet.csv";
  a.click();

  window.URL.revokeObjectURL(url);
};

/* ================================
   COMPONENT
================================ */
const ManageTimesheet = () => {
  const dispatch = useDispatch();

  const { my: timesheets = [], loading } = useSelector(
    (s) => s.timesheets
  );

  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("All");

  /* Fetch on load */
  useEffect(() => {
    dispatch(fetchMyTimesheets({}));
  }, [dispatch]);

  /* Search handler */
  const handleSearch = () => {
    dispatch(
      fetchMyTimesheets({
        month,
        status: status === "All" ? undefined : status,
      })
    );
  };

  return (
    <div className="manageTimesheet-wrapper">
      {/* Monthly Summary */}
      <MonthlySummary />

      <div className="manageTimesheet-card">
        {/* Filters */}
        <div className="manageTimesheet-filters">
          <div className="filter-group">
            <label>Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>
              <option>At work</option>
              <option>WFH</option>
              <option>Leave</option>
              <option>Holiday</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            <FiSearch /> Search
          </button>

          <button
            className="export-btn"
            onClick={() => exportCSV(timesheets)}
            disabled={!timesheets.length}
          >
            <FiDownload /> Export
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          {loading ? (
            <div className="empty">
              Loading timesheets...
            </div>
          ) : timesheets.length === 0 ? (
            <div className="empty">
              No timesheets to show
            </div>
          ) : (
            <table className="manageTimesheet-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>From</th>
                  <th>Linkage</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {timesheets.map((row) => (
                  <tr key={row._id}>
                    <td>{new Date(row.date).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={`status-pill ${row.workStatus
                          .toLowerCase()
                          .replace(" ", "")}`}
                      >
                        {row.workStatus}
                      </span>
                    </td>

                    <td colSpan="4" className="nested-items-cell">
                      {row.items?.length > 0 ? (
                        <div className="nested-timesheet-items">
                          {row.items.map((item, idx) => (
                            <div key={idx} className="nested-item-row">
                              <span className="time-block">{item.from} - {item.to} ({item.minutes}m)</span>
                              <span className="desc-block">{item.description || "—"}</span>
                              <div className="linkage-block">
                                {item.project && <span className="chip proj-chip">{item.project.name}</span>}
                                {item.todo && <span className="chip task-chip">{item.todo.taskKey}</span>}
                                {item.release && <span className="chip rel-chip">{item.release.version}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="no-items">No specific logs</span>
                      )}
                    </td>

                    <td className="actions">
                      <FiEye title="View" />
                      <FiEdit title="Edit" />
                      <FiTrash2 title="Delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTimesheet;
