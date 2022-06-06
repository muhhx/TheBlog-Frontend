import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout/Layout";
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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmemail" element={<ConfirmEmail />} />
        <Route path="/confirmemail/:id" element={<ValidateEmail />} />
        <Route path="/forgotpassword" element={<div>Forgot password</div>} />

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/private" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
