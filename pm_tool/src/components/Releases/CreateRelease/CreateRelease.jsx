import "./CreateRelease.css";

const CreateRelease = () => {
  return (
    <div className="createRelease-card">
      <h4>Create New Release</h4>

      <div className="createRelease-grid">
        <input placeholder="Release Title" />
        <select><option>Select Project</option></select>
        <input placeholder="Est. Hours (External)" />
        <input placeholder="Est. Hours (Internal)" />
        <input type="date" />
        <input type="date" />
        <textarea placeholder="Description" />
      </div>

      <button className="primary-btn">Create Release</button>
    </div>
  );
};

export default CreateRelease;
