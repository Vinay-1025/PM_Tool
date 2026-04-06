import "./EmptyState.css";

const EmptyState = ({ title, description }) => {
  return (
    <div className="emptyState">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default EmptyState;
