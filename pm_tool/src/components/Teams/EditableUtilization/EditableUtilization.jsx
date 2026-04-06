import "./EditableUtilization.css";

const EditableUtilization = ({ value, onChange }) => {
  return (
    <div className="util-edit">
      <div className="util-header">
        <h4>Team Utilization</h4>
        <span>{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default EditableUtilization;
