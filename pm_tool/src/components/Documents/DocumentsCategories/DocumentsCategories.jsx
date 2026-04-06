import "./DocumentsCategories.css";

const categories = [
  { name: "Requirements", count: 2 },
  { name: "Design", count: 3 },
  { name: "Reports", count: 1 },
];

const DocumentsCategories = () => (
  <div className="categories-grid">
    {categories.map(c => (
      <div key={c.name} className="category-card">
        <h4>{c.name}</h4>
        <span>{c.count} files</span>
      </div>
    ))}
  </div>
);

export default DocumentsCategories;
