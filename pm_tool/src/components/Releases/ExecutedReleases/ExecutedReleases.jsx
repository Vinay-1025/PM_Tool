import ReleaseTable from "../ReleaseTable/ReleaseTable";

const executedReleases = [
  {
    id: "ER-001",
    title: "E-Commerce Platform – Sprint 3",
    project: "E-Commerce Platform Redesign",
    external: 120,
    internal: 80,
    start: "01/03/2024",
    end: "15/03/2024",
    status: "Success",
  },
  {
    id: "ER-002",
    title: "Mobile App – Sprint 0",
    project: "Mobile App Development",
    external: 80,
    internal: 60,
    start: "01/02/2024",
    end: "14/02/2024",
    status: "Success",
  },
  {
    id: "ER-003",
    title: "Cloud Migration – Phase 1",
    project: "Cloud Migration",
    external: 160,
    internal: 120,
    start: "15/01/2024",
    end: "31/01/2024",
    status: "Rolled Back",
  },
];

const ExecutedReleases = () => {
  return (
    <ReleaseTable
      title="Executed Releases"
      data={executedReleases}
      variant="executed"
    />
  );
};

export default ExecutedReleases;
