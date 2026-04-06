// import { useState } from "react";
// import "./AddTimesheet.css";
// import { saveTimesheet } from "../../../store/slices/timesheetSlice";
// import { useDispatch } from "react-redux";

// const AddTimesheet = () => {
//   const dispatch = useDispatch()

//   const [items, setItems] = useState([{}]);

//   const handleSave = () => {
//     dispatch(
//       saveTimesheet({
//         date,
//         workStatus,
//         items
//       })
//     )
//   }

//   const addItem = () => setItems([...items, {}]);

//   return (
//     <div className="addTimesheet-wrapper">
//       <div className="addTimesheet-card">
//         <h3 className="addTimesheet-title">Add Timesheet</h3>

//         {/* Basic Info */}
//         <div className="addTimesheet-section">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>
//                 Date <span>*</span>
//               </label>
//               <input type="date" />
//             </div>

//             <div className="form-group">
//               <label>
//                 Work Status <span>*</span>
//               </label>
//               <select>
//                 <option>At work</option>
//                 <option>WFH</option>
//                 <option>Leave</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Records */}
//         <div className="addTimesheet-section">
//           <h4 className="section-title">Timesheet Records</h4>

//           <div className="checkbox-row">
//             <input type="checkbox" id="shortLeave" />
//             <label htmlFor="shortLeave">
//               Check this box to add a short leave (e.g. leave for 2 hours)
//             </label>
//           </div>

//           {items.map((_, idx) => (
//             <div key={idx} className="timesheet-item">
//               <div className="form-grid">
//                 {/* From Time */}
//                 <div className="form-group">
//                   <label>
//                     From Time <span>*</span>
//                   </label>
//                   <div className="time-group">
//                     <select>
//                       {[...Array(24)].map((_, i) => (
//                         <option key={i}>{String(i).padStart(2, "0")}</option>
//                       ))}
//                     </select>
//                     <span>Hrs</span>
//                     <select>
//                       {[0, 15, 30, 45].map(m => (
//                         <option key={m}>{String(m).padStart(2, "0")}</option>
//                       ))}
//                     </select>
//                     <span>Min</span>
//                   </div>
//                 </div>

//                 {/* To Time */}
//                 <div className="form-group">
//                   <label>
//                     To Time <span>*</span>
//                   </label>
//                   <div className="time-group">
//                     <select>
//                       {[...Array(24)].map((_, i) => (
//                         <option key={i}>{String(i).padStart(2, "0")}</option>
//                       ))}
//                     </select>
//                     <span>Hrs</span>
//                     <select>
//                       {[0, 15, 30, 45].map(m => (
//                         <option key={m}>{String(m).padStart(2, "0")}</option>
//                       ))}
//                     </select>
//                     <span>Min</span>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Type <span>*</span>
//                   </label>
//                   <select>
//                     <option>Select</option>
//                     <option>Development</option>
//                     <option>Testing</option>
//                     <option>Meeting</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Team <span>*</span>
//                   </label>
//                   <select>
//                     <option>Select</option>
//                     <option>Frontend</option>
//                     <option>Backend</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Project <span>*</span>
//                   </label>
//                   <select>
//                     <option>Select</option>
//                     <option>E-Commerce Platform</option>
//                     <option>Mobile App</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Release <span>*</span>
//                   </label>
//                   <select>
//                     <option>Select release</option>
//                     <option>R1</option>
//                     <option>R2</option>
//                   </select>
//                 </div>

//                 <div className="form-group full">
//                   <label>Todo</label>
//                   <select>
//                     <option>Select a todo</option>
//                   </select>
//                 </div>

//                 <div className="form-group full">
//                   <label>Description</label>
//                   <textarea rows="3" placeholder="Describe your work..." />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="addTimesheet-actions">
//           <button className="secondary-btn" onClick={addItem}>
//             Add another item
//           </button>

//           <button className="primary-btn" onClick={handleSave}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTimesheet;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTimesheet } from "../../../store/slices/timesheetSlice";
import "./AddTimesheet.css";

const emptyItem = {
  fromHour: "09",
  fromMin: "00",
  toHour: "18",
  toMin: "00",
  type: "",
  team: "",
  project: "",
  description: "",
};

// ✅ Helper to get today's date (YYYY-MM-DD)
const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const AddTimesheet = () => {
  const dispatch = useDispatch();

  // ✅ Default date = today
  const [date, setDate] = useState(getToday());
  const [workStatus, setWorkStatus] = useState("At work");
  const [items, setItems] = useState([{ ...emptyItem }]);

  /* ---------------- Add item ---------------- */
  const addItem = () => {
    setItems([...items, { ...emptyItem }]);
  };

  /* ---------------- Update item ---------------- */
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setItems(updated);
  };

  /* ---------------- Save ---------------- */
  const handleSave = () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    if (!items.length) {
      alert("Add at least one timesheet entry");
      return;
    }

    const formattedItems = items.map((i) => ({
      fromTime: `${i.fromHour}:${i.fromMin}`,
      toTime: `${i.toHour}:${i.toMin}`,
      type: i.type,
      team: i.team || null,
      project: i.project || null,
      description: i.description
    }));

    dispatch(
      saveTimesheet({
        date,
        workStatus,
        items: formattedItems
      })
    );
  };

  return (
    <div className="addTimesheet-wrapper">
      <div className="addTimesheet-card">
        <h3 className="addTimesheet-title">Add Timesheet</h3>

        {/* Basic Info */}
        <div className="addTimesheet-section">
          <div className="form-grid">
            <div className="form-group">
              <label>
                Date <span>*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                Work Status <span>*</span>
              </label>
              <select
                value={workStatus}
                onChange={(e) => setWorkStatus(e.target.value)}
              >
                <option>At work</option>
                <option>WFH</option>
                <option>Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className="addTimesheet-section">
          <h4 className="section-title">Timesheet Records</h4>

          {items.map((item, idx) => (
            <div key={idx} className="timesheet-item">
              <div className="form-grid">
                {/* From Time */}
                <div className="form-group">
                  <label>From Time *</label>
                  <div className="time-group">
                    <select
                      value={item.fromHour}
                      onChange={(e) =>
                        updateItem(idx, "fromHour", e.target.value)
                      }
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i}>
                          {String(i).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={item.fromMin}
                      onChange={(e) =>
                        updateItem(idx, "fromMin", e.target.value)
                      }
                    >
                      {[0, 15, 30, 45].map((m) => (
                        <option key={m}>
                          {String(m).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* To Time */}
                <div className="form-group">
                  <label>To Time *</label>
                  <div className="time-group">
                    <select
                      value={item.toHour}
                      onChange={(e) =>
                        updateItem(idx, "toHour", e.target.value)
                      }
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i}>
                          {String(i).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={item.toMin}
                      onChange={(e) =>
                        updateItem(idx, "toMin", e.target.value)
                      }
                    >
                      {[0, 15, 30, 45].map((m) => (
                        <option key={m}>
                          {String(m).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Type *</label>
                  <select
                    value={item.type}
                    onChange={(e) =>
                      updateItem(idx, "type", e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option>Development</option>
                    <option>Testing</option>
                    <option>Meeting</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(idx, "description", e.target.value)
                    }
                    placeholder="Describe your work..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="addTimesheet-actions">
          <button className="secondary-btn" onClick={addItem}>
            Add another item
          </button>

          <button className="primary-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTimesheet;
