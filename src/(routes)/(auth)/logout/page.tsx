import { logoutRequest } from "@/features/auth/authApi";
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const navigate = useNavigate();

  const {
    actions: { setNotAuthed },
  } = useAuth();
  const handleLogout = async () => {
    await logoutRequest();
    setNotAuthed();
    navigate("/");
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div className="font-heading-6 w-screen h-screen flex items-center justify-center">
      Logging out...
    </div>
  );
}
