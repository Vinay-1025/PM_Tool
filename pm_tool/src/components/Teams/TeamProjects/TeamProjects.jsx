import { useSelector } from "react-redux";
import "./TeamProjects.css";

const TeamProjects = () => {
  const teams = useSelector(state => state.teams.list || []);

  const teamsWithProjects = teams.map(team => ({
    id: team._id,
    name: team.name,
    projects: team.projects?.length
      ? team.projects.map((p, i) => ({
          id: p._id || i,
          name: p.name || `Project ${i + 1}`,
          status: p.status || "Active",
          progress: p.progress ?? Math.floor(Math.random() * 80 + 10),
          startDate: p.startDate || "2025-01-10",
          endDate: p.endDate || "2025-03-30"
        }))
      : []
  }));

  if (!teamsWithProjects.length) {
    return (
      <div className="team-projects-empty">
        No teams or projects found
      </div>
    );
  }

  return (
    <div className="team-projects-page">
      {teamsWithProjects.map(team => (
        <div key={team.id} className="team-projects-card">
          {/* Team Header */}
          <div className="team-projects-header">
            <h3>{team.name}</h3>
            <span className="team-projects-count">
              {team.projects.length} Projects
            </span>
          </div>

          {/* Table Header */}
          <div className="team-projects-table-header">
            <span>Project</span>
            <span>Status</span>
            <span>Timeline</span>
            <span>Progress</span>
          </div>

          {/* Projects */}
          {team.projects.length ? (
            <div className="team-projects-table-body">
              {team.projects.map(project => (
                <div
                  key={project.id}
                  className="team-projects-row"
                >
                  {/* Project Name */}
                  <div className="col project-name">
                    {project.name}
                  </div>

                  {/* Status */}
                  <div className="col">
                    <span
                      className={`status-pill ${project.status.toLowerCase()}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="col project-dates">
                    {project.startDate} → {project.endDate}
                  </div>

                  {/* Progress */}
                  <div className="col project-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span>{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="team-projects-no-data">
              No projects assigned
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamProjects;
