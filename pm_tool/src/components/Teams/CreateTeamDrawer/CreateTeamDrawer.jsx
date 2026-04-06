import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamUsers } from "../../../store/slices/userSlice";
import "./CreateTeamDrawer.css";
import MuiUserMultiSelect from "../../common/MultiUserSelect";

const CreateTeamDrawer = ({ open, onClose, onCreate }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users?.teamUsers || []);

  const [form, setForm] = useState({
    name: "",
    utilization: 60,
    lead: "",
    projectManager: "",
    members: [] // 👈 STORE USER OBJECTS
  });

  useEffect(() => {
    if (open) {
      dispatch(
        fetchTeamUsers([
          "team_lead",
          "manager",
          "project_manager",
          "member",
          "intern",
          "contractor"
        ])
      );
    }
  }, [open, dispatch]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name || !form.lead) return;

    onCreate({
      name: form.name,
      utilization: Number(form.utilization),
      lead: form.lead,
      projectManager: form.projectManager || null,
      members: form.members.map(u => ({
        user: u._id,
        role: "developer",
        capacity: 100
      }))
    });
  };

  return (
    <div className="createTeam-backdrop" onClick={onClose}>
      <aside
        className="createTeamDrawer"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <h3>Create Team</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="drawer-body">

          {/* Team Name */}
          <div className="form-group">
            <label>Team Name *</label>
            <input
              placeholder="e.g. Frontend Avengers"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Team Lead */}
          <div className="form-group">
            <label>Team Lead *</label>
            <select
              value={form.lead}
              onChange={e =>
                setForm({ ...form, lead: e.target.value })
              }
            >
              <option value="">Select Team Lead</option>
              {users
                .filter(u =>
                  ["team_lead", "manager"].includes(u.role)
                )
                .map(u => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
            </select>
          </div>

          {/* Project Manager */}
          <div className="form-group">
            <label>Project Manager</label>
            <select
              value={form.projectManager}
              onChange={e =>
                setForm({
                  ...form,
                  projectManager: e.target.value
                })
              }
            >
              <option value="">Select Project Manager</option>
              {users
                .filter(u =>
                  ["project_manager", "manager"].includes(u.role)
                )
                .map(u => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.role})
                  </option>
                ))}
            </select>
          </div>

          {/* Members */}
          <div className="form-group">
            <label>Team Members</label>
            <MuiUserMultiSelect
              label="Team Members"
              users={users.filter(u =>
                ["member", "intern", "contractor"].includes(u.role)
              )}
              value={form.members}
              onChange={members =>
                setForm({ ...form, members })
              }
            />
          </div>

          {/* Utilization */}
          <div className="form-group">
            <label>Initial Utilization</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.utilization}
              onChange={e =>
                setForm({
                  ...form,
                  utilization: e.target.value
                })
              }
            />
            <span>{form.utilization}%</span>
          </div>

        </div>

        {/* Footer */}
        <div className="drawer-footer">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSubmit}>
            Create Team
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CreateTeamDrawer;
