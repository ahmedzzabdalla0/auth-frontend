import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Outlet />
    </main>
  );
}
