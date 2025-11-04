import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomeView = lazy(() => import("./views/HomeView"))
const DashboardView = lazy(() => import("./views/DashboardView"))
const LoginView = lazy(() => import("./views/users/LoginView"))
const RegisterView = lazy(() => import("./views/users/RegisterView"))
const ForgotPasswordView = lazy(() => import("./views/users/ForgotPasswordView"))

export default function Router () {
  return (
    <>
      <Routes>
        <Route index path="/" element={HomeView} />
        <Route path="/login" element={LoginView} />
        <Route path="/register" element={RegisterView} />
        <Route path="/forgot-password" element={ForgotPasswordView} />
        <Route path="/dahsboard" element={DashboardView} />
      </Routes>
    </>
  )
}