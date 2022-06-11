import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/Layout";
import SecondaryLayout from "./components/SecondaryLayout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import ValidateEmail from "./pages/ValidateEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<div>User</div>} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmemail" element={<ConfirmEmail />} />
          <Route path="/confirmemail/:id" element={<ValidateEmail />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/:id" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/private" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
