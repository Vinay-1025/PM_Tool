import { useState } from "react";
import TaskHeader from "../../components/Tasks/TaskHeader/TaskHeader";
import TaskToolbar from "../../components/Tasks/TaskToolbar/TaskToolbar";
import TaskTabs from "../../components/Tasks/TaskTabs/TaskTabs";
import TaskBoard from "../../components/Tasks/TaskBoard/TaskBoard";
import PlanningView from "../../components/Tasks/PlanningView/PlanningView";
import TaskDrawer from "../../components/Tasks/TaskDrawer/TaskDrawer";
import CreateTaskForm from "../../components/Tasks/CreateTaskForm/CreateTaskForm";
import EmptyState from "../../components/Tasks/EmptyState/EmptyState";
import CalendarView from "../../components/Tasks/CalendarView/CalendarView";
import MyTodos from "../../components/Tasks/MyTodos/MyTodos";
import AddedByMe from "../../components/Tasks/AddedByMe/AddedByMe";
import ManageTodos from "../../components/Tasks/ManageTodos/ManageTodos";

import "./Tasks.css";

const Tasks = () => {
  const [view, setView] = useState("calendar");
  const [open, setOpen] = useState(false);

  return (
    <div className="tasks-page">
      {/* Header */}
      <TaskHeader view={view} onViewChange={setView} />

      {/* Toolbar */}
      <TaskToolbar onCreate={() => setOpen(true)} />

      {/* Tabs */}
      <TaskTabs
        active={view}
        onChange={(tab) => {
          if (tab === "create") {
            setOpen(true);
          } else {
            setView(tab);
          }
        }}
      />

      {/* Content */}
      <div className="tasks-content">
        {view === "planning" && <PlanningView />}
        {view === "kandan" && <TaskBoard />}
        {view === "calendar" && <CalendarView />}
        {view === "my" && <MyTodos />}
        {view === "added" && <AddedByMe />}
        {view === "manage" && <ManageTodos />}


      </div>

      {/* Drawer */}
      <TaskDrawer open={open} onClose={() => setOpen(false)}>
        <CreateTaskForm onSuccess={() => setOpen(false)} />
      </TaskDrawer>
    </div>
  );
};

export default Tasks;
