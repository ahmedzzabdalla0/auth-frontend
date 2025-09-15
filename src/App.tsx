import { BrowserRouter, Route, Routes } from "react-router";

// Layouts
import AppLayout from "@/(routes)/layout";
import AuthLayout from "@/(routes)/(auth)/layout";
import DashboardLayout from "@/(routes)/(protected)/dashboard/layout";

// Pages
import LoginPage from "@/(routes)/(auth)/login/page";
import SignupPage from "@/(routes)/(auth)/signup/page";
import DashboardPage from "@/(routes)/(protected)/dashboard/page";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/authProvider.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route element={<AuthLayout />}>
                <Route path="" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>
              <Route element={<DashboardLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
