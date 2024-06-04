import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const isAdmin = true;

  return isAdmin ? children : <Navigate to="/" replace />;
}