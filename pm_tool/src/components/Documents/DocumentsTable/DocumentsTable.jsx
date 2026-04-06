import "./DocumentsTable.css";

const docs = [
  {
    name: "Project Requirements.pdf",
    project: "E-Commerce Platform",
    category: "Requirements",
    size: "2.4 MB",
    owner: "Sarah Chen",
    versions: 3,
  },
  {
    name: "UI Design Specs.pdf",
    project: "Mobile App",
    category: "Design",
    size: "5.5 MB",
    owner: "Emily Davis",
    versions: 2,
  },
];

const DocumentsTable = () => {
  return (
    <div className="documentsTable-card">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Project</th>
            <th>Category</th>
            <th>Size</th>
            <th>Uploaded By</th>
            <th>Versions</th>
          </tr>
        </thead>
        <tbody>
          {docs.map(doc => (
            <tr key={doc.name}>
              <td>{doc.name}</td>
              <td>{doc.project}</td>
              <td>
                <span className="category-pill">{doc.category}</span>
              </td>
              <td>{doc.size}</td>
              <td>{doc.owner}</td>
              <td>{doc.versions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
