import { useState } from "react";
import "./CreateProjectDrawer.css";

const CreateProjectDrawer = ({
  open,
  onClose,
  onCreate,
  teams = [],
  onAddTeam
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    methodology: "Agile",
    startDate: "",
    endDate: "",
    teams: []
  });

  if (!open) return null;

  const selectedTeams = teams.filter(t =>
    form.teams.includes(t._id)
  );

  const submit = () => {
    if (!form.name || form.teams.length === 0) return;

    onCreate({
      name: form.name,
      description: form.description,
      methodology: form.methodology,
      startDate: form.startDate,
      endDate: form.endDate,
      teams: form.teams
    });
  };

  return (
    <div
      className="project-drawer-backdrop"
      onClick={onClose}
    >
      <aside
        className="project-drawer"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="project-drawer-header">
          <h3>Create Project</h3>
          <button
            className="project-drawer-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="project-drawer-body">

          {/* Project Name */}
          <div className="project-drawer-form-group">
            <label>Project Name *</label>
            <input
              placeholder="e.g. Mobile App Revamp"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="project-drawer-form-group">
            <label>Description</label>
            <textarea
              placeholder="Short description about the project"
              value={form.description}
              onChange={e =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />
          </div>

          {/* Methodology */}
          <div className="project-drawer-form-group">
            <label>Methodology</label>
            <select
              value={form.methodology}
              onChange={e =>
                setForm({
                  ...form,
                  methodology: e.target.value
                })
              }
            >
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Assign Teams */}
          <div className="project-drawer-form-group">
            <div className="project-drawer-inline-header">
              <label>Assign Teams *</label>
              <button
                type="button"
                className="project-drawer-link-btn"
                onClick={onAddTeam}
              >
                + Add Team
              </button>
            </div>

            <select
              multiple
              className="project-drawer-team-multiselect"
              value={form.teams}
              onChange={e =>
                setForm({
                  ...form,
                  teams: [...e.target.selectedOptions].map(
                    o => o.value
                  )
                })
              }
            >
              {teams.map(t => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Team Members Preview */}
          {selectedTeams.length > 0 && (
            <div className="project-drawer-team-preview">
              <span className="project-drawer-section-label">
                Team Members
              </span>

              {selectedTeams.map(team => (
                <div
                  key={team._id}
                  className="project-drawer-team-preview-group"
                >
                  <strong>{team.name}</strong>
                  <div className="project-drawer-avatars-row">
                    {team.members.map(m => (
                      <span
                        key={m.user._id}
                        className="project-drawer-avatar"
                        title={m.user.name}
                      >
                        {m.user.name
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dates */}
          <div className="project-drawer-date-row">
            <div className="project-drawer-form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e =>
                  setForm({
                    ...form,
                    startDate: e.target.value
                  })
                }
              />
            </div>

            <div className="project-drawer-form-group">
              <label>End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={e =>
                  setForm({
                    ...form,
                    endDate: e.target.value
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="project-drawer-footer">
          <button
            className="project-drawer-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="project-drawer-btn-primary"
            onClick={submit}
          >
            Create Project
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CreateProjectDrawer;
