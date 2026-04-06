import "./Holidays.css";

const holidays = [
  { date: "01-01-2024", name: "New Year", type: "Public Holiday" },
  { date: "15-01-2024", name: "Sankranthi", type: "Public Holiday" },
  { date: "26-01-2024", name: "Republic Day", type: "Public Holiday" },
  { date: "25-03-2024", name: "Holi", type: "Public Holiday" },
  { date: "15-08-2024", name: "Independence Day", type: "Public Holiday" },
  { date: "02-10-2024", name: "Gandhi Jayanti", type: "Public Holiday" },
];

const Holidays = () => {
  return (
    <div className="holidays-page">
      {/* Header */}
      <div className="holidays-header">
        <div>
          <h2>Holidays</h2>
          <p>Public & company-wide holidays</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="holidays-card">
        <table className="holidays-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday Name</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {holidays.map((h, index) => (
              <tr key={index}>
                <td className="holiday-date">{h.date}</td>
                <td className="holiday-name">{h.name}</td>
                <td>
                  <span className="holiday-pill">
                    {h.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {holidays.length === 0 && (
          <div className="empty-state">
            No holidays available
          </div>
        )}
      </div>
    </div>
  );
};

export default Holidays;
