import { createContext, useContext, useState } from "react";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  return (
    <AdminContext.Provider value={{ token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
};

// Corrected custom hook
export const useAdmin = () => useContext(AdminContext);

export default AdminProvider;
