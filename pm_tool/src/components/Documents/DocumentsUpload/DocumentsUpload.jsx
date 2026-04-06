import { FiUploadCloud } from "react-icons/fi";
import "./DocumentsUpload.css";

const DocumentsUpload = () => (
  <div className="upload-card">
    <FiUploadCloud size={40} />
    <h4>Drag and drop files here</h4>
    <p>or click to browse</p>
    <button>Browse Files</button>
  </div>
);

export default DocumentsUpload;
