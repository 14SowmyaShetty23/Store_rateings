import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaStore, FaPlus, FaSignOutAlt } from "react-icons/fa";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={container}>
      
      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={logo}>⚡ Store Admin</h2>

        <SidebarItem icon={<FaHome />} label="Dashboard" path="/dashboard" />
        <SidebarItem icon={<FaUsers />} label="Users" path="/users" />
        <SidebarItem icon={<FaStore />} label="Stores" path="/stores" />
        <SidebarItem icon={<FaPlus />} label="Add User" path="/add-user" />
        <SidebarItem icon={<FaPlus />} label="Add Store" path="/add-store" />

        <div style={{ marginTop: "auto" }}>
          <SidebarItem icon={<FaSignOutAlt />} label="Logout" onClick={logout} danger />
        </div>
      </div>

      {/* MAIN AREA */}
      <div style={main}>
        
        {/* TOPBAR */}
        <div style={topbar}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
        </div>

        {/* CONTENT */}
        <div style={content}>
          {children}
        </div>
      </div>
    </div>
  );

  function SidebarItem({ icon, label, path, onClick, danger }) {
    const active = path && isActive(path);

    return (
      <div
        onClick={() => (onClick ? onClick() : navigate(path))}
        style={{
          ...sidebarItem,
          background: active ? "rgba(255,255,255,0.15)" : "transparent",
          color: danger ? "#f87171" : "#e2e8f0",
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
    );
  }
}

export default AdminLayout;

//
// 🎨 PREMIUM STYLES
//

const container = {
  display: "flex",
  height: "100vh",
  fontFamily: "Inter, sans-serif",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
};

const sidebar = {
  width: "250px",
  backdropFilter: "blur(10px)",
  background: "rgba(15,23,42,0.8)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid rgba(255,255,255,0.1)",
};

const logo = {
  color: "white",
  marginBottom: "30px",
};

const sidebarItem = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "10px",
  cursor: "pointer",
  transition: "0.3s",
};

const main = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const topbar = {
  padding: "15px 25px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  color: "white",
};

const content = {
  padding: "25px",
  flex: 1,
  overflowY: "auto",
  color: "black",   // ✅ applies to all text inside
};