import { Navigate } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

const AdminRoute = ({ children }) => {
  const { token } = useAdmin();
  return token ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
