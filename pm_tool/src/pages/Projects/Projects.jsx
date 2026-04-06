import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Projects.css";
import ProjectsHeader from "../../components/Projects/ProjectsHeader/ProjectsHeader";
import ProjectsToolbar from "../../components/Projects/ProjectsToolbar/ProjectsToolbar";
import ProjectsTabs from "../../components/Projects/ProjectsTabs/ProjectsTabs";
import ProjectCard from "../../components/Projects/ProjectCard/ProjectCard";
import CreateProjectDrawer from "../../components/Projects/CreateProjectDrawer/CreateProjectDrawer";
import CreateTeamDrawer from "../../components/Teams/CreateTeamDrawer/CreateTeamDrawer";
import CreateSprintDrawer from "../../components/Projects/ProjectDrawers/CreateSprintDrawer";
import CreateReleaseDrawer from "../../components/Projects/ProjectDrawers/CreateReleaseDrawer";
import LogTimeDrawer from "../../components/Projects/ProjectDrawers/LogTimeDrawer";

import {
  fetchProjects,
  createProject
} from "../../store/slices/projectSlice";

import {
  fetchTeams,
  createTeam
} from "../../store/slices/teamSlice";

const Projects = () => {
  const dispatch = useDispatch();

  /* ---------------- Redux state ---------------- */
  const { list: projects = [], loading } = useSelector(
    state => state.projects || {}
  );

  const teams = useSelector(state => state.teams.list || []);

  /* ---------------- Local state ---------------- */
  const [view, setView] = useState("grid");
  const [activeTab, setActiveTab] = useState("overview");
  const [createOpen, setCreateOpen] = useState(false);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);

  // Cross-component Drawer States
  const [sprintDrawerOpen, setSprintDrawerOpen] = useState(false);
  const [releaseDrawerOpen, setReleaseDrawerOpen] = useState(false);
  const [logTimeDrawerOpen, setLogTimeDrawerOpen] = useState(false);
  const [activeProjectContext, setActiveProjectContext] = useState(null);

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTeams()); // ✅ REQUIRED
  }, [dispatch]);

  /* ---------------- Handlers ---------------- */

  const handleCreateProject = (data) => {
    dispatch(createProject(data))
      .unwrap()
      .then(() => {
        setCreateOpen(false);
        dispatch(fetchProjects());
      })
      .catch(err => {
        console.error("Create project failed:", err);
        alert("Failed to create project");
      });
  };

  const handleAddSprintClick = (project) => {
    setActiveProjectContext(project);
    setSprintDrawerOpen(true);
  };

  const handleAddReleaseClick = (project) => {
    setActiveProjectContext(project);
    setReleaseDrawerOpen(true);
  };

  const handleLogTimeClick = (project) => {
    setActiveProjectContext(project);
    setLogTimeDrawerOpen(true);
  };

  const handleCreateTeamFromProject = (data) => {
    dispatch(createTeam(data))
      .unwrap()
      .then(() => {
        setCreateTeamOpen(false);
        dispatch(fetchTeams()); // 🔁 refresh dropdown
      })
      .catch(err => {
        console.error("Create team failed:", err);
        alert("Failed to create team");
      });
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="projects-page">
      {/* Header */}
      <ProjectsHeader onCreate={() => setCreateOpen(true)} />

      {/* Toolbar */}
      <ProjectsToolbar view={view} setView={setView} />

      {/* Tabs */}
      <ProjectsTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      {loading ? (
        <div className="projects-loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="projects-empty">No projects created yet</div>
      ) : (
        <div className={`projects-grid ${view}`}>
          {projects.map(project => {
            const startDate = project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "—";

            const endDate = project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "—";

            return (
              <ProjectCard
                key={project._id}
                project={{
                  id: project._id,
                  name: project.name,
                  description: project.description,
                  status: project.status,
                  health: project.health,
                  progress: project.progress ?? 0,
                  dates: `${startDate} – ${endDate}`,
                  methodology: project.methodology,
                  manager: "—",
                  members:
                    project.teams?.flatMap(team =>
                      team.members
                        ?.slice(0, 3)
                        .map(m =>
                          m.user?.name
                            ?.slice(0, 2)
                            .toUpperCase()
                        )
                    ) || [],
                  sprintCount: project.sprints?.length || 0,
                  releaseCount: project.releases?.length || 0,
                  taskCount: project.tasks?.length || 0
                }}
                onAddSprint={handleAddSprintClick}
                onAddRelease={handleAddReleaseClick}
                onLogTime={handleLogTimeClick}
              />
            );
          })}
        </div>
      )}

      {/* Create Project Drawer */}
      <CreateProjectDrawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateProject}
        teams={teams}
        onAddTeam={() => setCreateTeamOpen(true)}
      />

      {/* Create Team Drawer (FIXED) */}
      <CreateTeamDrawer
        open={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
        onCreate={handleCreateTeamFromProject} // ✅ THIS FIXES THE CRASH
      />

      {/* Interlinked Functionality Drawers */}
      <CreateSprintDrawer
        open={sprintDrawerOpen}
        onClose={() => setSprintDrawerOpen(false)}
        project={activeProjectContext}
      />

      <CreateReleaseDrawer
        open={releaseDrawerOpen}
        onClose={() => setReleaseDrawerOpen(false)}
        project={activeProjectContext}
      />

      <LogTimeDrawer
        open={logTimeDrawerOpen}
        onClose={() => setLogTimeDrawerOpen(false)}
        project={activeProjectContext}
      />
    </div>
  );
};

export default Projects;
