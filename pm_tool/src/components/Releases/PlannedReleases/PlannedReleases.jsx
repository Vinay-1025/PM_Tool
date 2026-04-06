import ReleaseTable from "../ReleaseTable/ReleaseTable";

const data = [
  {
    id: "R001",
    title: "E-Commerce Platform – Sprint 3",
    project: "E-Commerce Platform Redesign",
    external: 120,
    internal: 80,
    start: "01/03/2024",
    end: "15/03/2024",
    status: "Completed",
  },
  {
    id: "R002",
    title: "Mobile App – Sprint 0",
    project: "Mobile App Development",
    external: 80,
    internal: 60,
    start: "01/02/2024",
    end: "14/02/2024",
    status: "Completed",
  },
];

const PlannedReleases = () => {
  return <ReleaseTable title="Planned Releases" data={data} />;
};

export default PlannedReleases;
