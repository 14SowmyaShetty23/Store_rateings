// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import Users from "./pages/Users";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import MyRatings from "./pages/MyRatings";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;

  if (requiredRole && role !== requiredRole) {
    if (role === "ADMIN") return <Navigate to="/AdminDashboard" replace />;
    if (role === "OWNER") return <Navigate to="/owner-dashboard" replace />;
    return <Navigate to="/UserDashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminDashboard" element={<PrivateRoute requiredRole="ADMIN"><AdminDashboard /></PrivateRoute>} />
        <Route path="/UserDashboard" element={<PrivateRoute requiredRole="USER"><UserDashboard /></PrivateRoute>} />
        <Route path="/owner-dashboard" element={<PrivateRoute requiredRole="OWNER"><OwnerDashboard /></PrivateRoute>} />
        <Route path="/add-user" element={<PrivateRoute requiredRole="ADMIN"><AddUser /></PrivateRoute>} />
        <Route path="/add-store" element={<PrivateRoute requiredRole="ADMIN"><AddStore /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute requiredRole="ADMIN"><Users /></PrivateRoute>} />
        <Route path="/stores" element={<PrivateRoute requiredRole="ADMIN"><Stores /></PrivateRoute>} />
        <Route path="/my-ratings" element={<PrivateRoute><MyRatings /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;