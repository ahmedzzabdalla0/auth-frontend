import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router";

export default function DashboardLayout() {
  const {
    states: { hasPermission },
  } = useAuth();

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
