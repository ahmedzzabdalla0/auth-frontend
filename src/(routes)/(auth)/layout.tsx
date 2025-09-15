import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const {
    states: { hasPermission },
  } = useAuth();

  if (hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
