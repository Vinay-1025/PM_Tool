import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { LayoutContext } from "../../context/LayoutContext";
import "./MainLayout.css";
import FloatingActions from "../FloatingActions/FloatingActions";

const MainLayout = ({ children }) => {
  const { collapsed } = useContext(LayoutContext);

  return (
    <>
      <Sidebar />
      <Header />
      <main className={`main-content ${collapsed ? "collapsed" : ""}`}>
        {children}
      </main>
      <FloatingActions />
    </>
  );
};

export default MainLayout;
