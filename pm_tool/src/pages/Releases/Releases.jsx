import { useState } from "react";
import ReleaseTabs from "../../components/Releases/ReleasesTabs/ReleasesTabs";
import PlannedReleases from "../../components/Releases/PlannedReleases/PlannedReleases";
import ExecutedReleases from "../../components/Releases/ExecutedReleases/ExecutedReleases";
import CreateRelease from "../../components/Releases/CreateRelease/CreateRelease";
import ManageReleases from "../../components/Releases/ManageReleases/ManageReleases";
import ProjectPhases from "../../components/Releases/ProjectPhases/ProjectPhases";
import ReleaseReports from "../../components/Releases/ReleaseReports/ReleaseReports";
import "./Releases.css";

const Releases = () => {
  const [activeTab, setActiveTab] = useState("planned");

  return (
    <div className="releases-page">
      <div className="releases-header">
        <div>
          <h2>Planned Releases</h2>
          <p>Manage project releases and deployments</p>
        </div>
      </div>

      <ReleaseTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "planned" && <PlannedReleases />}
      {activeTab === "executed" && <ExecutedReleases />}
      {activeTab === "create" && <CreateRelease />}
      {activeTab === "manage" && <ManageReleases />}
      {activeTab === "phases" && <ProjectPhases />}
      {activeTab === "reports" && <ReleaseReports />}
    </div>
  );
};

export default Releases;
