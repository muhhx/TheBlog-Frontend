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

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/confirmemail" element={<ConfirmEmail />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/confirmemail/:id" element={<ValidateEmail />} />
        </Route>
        <Route element={<SecondaryLayout />}>
          <Route path="/forgotpassword" element={<div>Forgot password</div>} />
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
