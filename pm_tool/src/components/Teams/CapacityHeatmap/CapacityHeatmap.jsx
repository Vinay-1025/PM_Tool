import "./CapacityHeatmap.css";

const CapacityHeatmap = ({ members }) => {
  return (
    <section>
      <h4>Capacity Heatmap</h4>

      <div className="heatmap">
        {members.map(m => (
          <div
            key={m.name}
            className={`heat ${m.capacity > 80 ? "high" : "normal"}`}
          >
            {m.initials}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CapacityHeatmap;
