import "./SprintsHeader.css";

const SprintsHeader = () => {
  return (
    <div className="sprintsHeader">
      <div>
        <h2>Sprints</h2>
        <p>Manage sprints, track velocity, and plan iterations</p>
      </div>

      <button className="sprintsHeader-btn">+ Create Sprint</button>
    </div>
  );
};

export default SprintsHeader;
