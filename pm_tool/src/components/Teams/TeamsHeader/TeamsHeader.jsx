import "./TeamsHeader.css";

const TeamsHeader = ({ onCreate }) => {
  return (
    <div className="teamsHeader">
      <div>
        <h2>Teams</h2>
        <p>Manage teams, members, and their capacity</p>
      </div>

      <button className="teamsHeader-btn" onClick={onCreate}>
        + Create Team
      </button>
    </div>
  );
};

export default TeamsHeader;
