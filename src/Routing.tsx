import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/Layout";
import SecondaryLayout from "./components/SecondaryLayout";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Editor from "./pages/Editor";
import Create from "./pages/Create";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import ValidateEmail from "./pages/ValidateEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Panel from "./components/PanelLayout";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<Panel />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="/search" element={<div>Search</div>} />
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
              <Route path="/foryou" element={<div>For you</div>} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/new" element={<Create />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
