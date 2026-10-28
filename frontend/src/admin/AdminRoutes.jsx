
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("buzzifyToken");
  const storedUser = localStorage.getItem("buzzifyUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
