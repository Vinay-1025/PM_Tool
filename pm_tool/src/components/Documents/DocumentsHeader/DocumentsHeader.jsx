import { FiSearch, FiUpload } from "react-icons/fi";
import "./DocumentsHeader.css";

const DocumentsHeader = () => {
  return (
    <div className="documentsHeader">
      {/* Left */}
      <div className="documentsHeader-left">
        <div className="documentsHeader-icon">📄</div>
        <div>
          <h2>Documents</h2>
          <p>Manage project documents and files</p>
        </div>
      </div>

      {/* Right */}
      <div className="documentsHeader-right">
        <div className="documentsHeader-search">
          <FiSearch />
          <input placeholder="Search documents..." />
        </div>

        <button className="documentsHeader-upload">
          <FiUpload />
          Upload
        </button>
      </div>
    </div>
  );
};

export default DocumentsHeader;
