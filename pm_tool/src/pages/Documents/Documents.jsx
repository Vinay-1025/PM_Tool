import { useState } from "react";
import DocumentsHeader from "../../components/Documents/DocumentsHeader/DocumentsHeader";
import DocumentsTabs from "../../components/Documents/DocumentsTabs/DocumentsTabs";
import DocumentsTable from "../../components/Documents/DocumentsTable/DocumentsTable";
import DocumentsCategories from "../../components/Documents/DocumentsCategories/DocumentsCategories";
import DocumentsUpload from "../../components/Documents/DocumentsUpload/DocumentsUpload";
import DocumentsVersionHistory from "../../components/Documents/DocumentsVersionHistory/DocumentsVersionHistory";
import "./Documents.css";

const Documents = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="documents-page">
      <DocumentsHeader />
      <DocumentsTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "all" && <DocumentsTable />}
      {activeTab === "upload" && <DocumentsUpload />}
      {activeTab === "categories" && <DocumentsCategories />}
      {activeTab === "versions" && <DocumentsVersionHistory />}
    </div>
  );
};

export default Documents;
