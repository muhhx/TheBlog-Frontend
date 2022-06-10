import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/Layout";
import SecondaryLayout from "../layouts/SecondaryLayout";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmEmail from "../pages/ConfirmEmail";
import ValidateEmail from "../pages/ValidateEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
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
