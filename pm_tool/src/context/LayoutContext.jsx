import React, { createContext, useState } from "react";

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
