import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";
import "./CalendarView.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const CalendarView = () => {
  const tasks = useSelector(state => state.tasks);
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [status, setStatus] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /* ===========================
     BUILD CALENDAR WEEKS
  =========================== */
  const weeks = useMemo(() => {
    const rows = [];
    let week = new Array(firstDay).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        rows.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push(null);
      rows.push(week);
    }

    return rows;
  }, [firstDay, daysInMonth]);

  /* ===========================
     FILTER TASKS
  =========================== */
  const filteredTasks = useMemo(() => {
    return tasks.filter(t =>
      t.startDate &&
      t.dueDate &&
      (status === "all" || t.status === status)
    );
  }, [tasks, status]);

  /* ===========================
     NAVIGATION
  =========================== */
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else setMonth(m => m + 1);
  };

  return (
    <div className="calendarView">

      {/* ================= HEADER ================= */}
      <div className="calendarHeader">
        <div className="calendarNav">
          <button onClick={prevMonth}><FiChevronLeft /></button>

          <select value={month} onChange={e => setMonth(+e.target.value)}>
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>

          <select value={year} onChange={e => setYear(+e.target.value)}>
            {[...Array(5)].map((_, i) => {
              const y = today.getFullYear() - 2 + i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>

          <button onClick={nextMonth}><FiChevronRight /></button>
        </div>

        <div className="calendarFilters">
          <FiFilter />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="review">Review</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* ============ WEEK HEADER ============ */}
      <div className="calendarWeekHeader">
        {DAYS.map(d => (
          <div key={d} className="calendarWeekDay">{d}</div>
        ))}
      </div>

      {/* ============ CALENDAR BODY ============ */}
      <div className="calendarBody">
        {weeks.map((week, wi) => {
          const weekStart = week.find(d => d !== null);
          const weekEnd = [...week].reverse().find(d => d !== null);

          const weekStartDate = new Date(year, month, weekStart);
          const weekEndDate = new Date(year, month, weekEnd);

          return (
            <div key={wi} className="calendarWeekRow">

              {/* Day cells */}
              {week.map((day, di) => {
                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();

                return (
                  <div
                    key={di}
                    className={`calendarDay ${isToday ? "today" : ""}`}
                  >
                    {day && <span className="date">{day}</span>}
                  </div>
                );
              })}

              {/* Spanning tasks */}
              <div className="calendarWeekTasks">
                {filteredTasks
                  .filter(task => {
                    const s = new Date(task.startDate);
                    const e = new Date(task.dueDate);
                    return s <= weekEndDate && e >= weekStartDate;
                  })
                  .map(task => {
                    const s = new Date(task.startDate);
                    const e = new Date(task.dueDate);

                    const startCol =
                      Math.max(week.indexOf(s.getDate()), 0) + 1;
                    const endCol =
                      Math.min(
                        week.indexOf(e.getDate()) !== -1
                          ? week.indexOf(e.getDate()) + 2
                          : 8,
                        8
                      );

                    return (
                      <div
                        key={task._id}
                        className={`calendarSpanTask ${task.status}`}
                        style={{ gridColumn: `${startCol} / ${endCol}` }}
                        onClick={() => setSelectedTask(task)}
                      >
                        {task.title}
                      </div>
                    );
                  })}
              </div>

            </div>
          );
        })}
      </div>

      {/* ============ TASK DETAILS MODAL ============ */}
      {selectedTask && (
        <div
          className="taskDetailsOverlay"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="taskDetails"
            onClick={e => e.stopPropagation()}
          >
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description || "No description"}</p>

            <div className="taskMeta">
              <span>Status: {selectedTask.status}</span>
              <span>Priority: {selectedTask.priority}</span>
              <span>
                {new Date(selectedTask.startDate).toDateString()} →{" "}
                {new Date(selectedTask.dueDate).toDateString()}
              </span>
            </div>

            <button onClick={() => setSelectedTask(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
