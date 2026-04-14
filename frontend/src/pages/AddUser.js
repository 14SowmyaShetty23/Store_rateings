import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  // 🔍 Search + Filter Logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.address.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "ALL" ? true : u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout>
      <h2 style={{ color: "white" }}>Users</h2>

      {/* 🔍 SEARCH + FILTER */}
      <div style={topControls}>
        <input
          placeholder="Search by name, email, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={filterSelect}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
        </select>
      </div>

      {/* 👤 TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Address</th>
            <th style={th}>Role</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u, index) => (
            <tr
              key={u.id}
              style={{
                ...(index % 2 === 0 ? rowEven : rowOdd),
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  index % 2 === 0
                    ? "rgba(255,255,255,0.03)"
                    : "transparent")
              }
            >
              <td style={td}>{u.name}</td>
              <td style={td}>{u.email}</td>
              <td style={td}>{u.address}</td>
              <td style={td}>
                <span style={roleBadge(u.role)}>{u.role}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default Users;

//
// 🎨 STYLES
//

const topControls = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
};

const searchInput = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

const filterSelect = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "12px",
  overflow: "hidden",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(8px)",
};

const th = {
  padding: "14px",
  textAlign: "left",
  background: "rgba(255,255,255,0.1)",
  color: "#e2e8f0",
};

const td = {
  padding: "12px",
  color: "#e2e8f0",
};

const rowEven = {
  background: "rgba(255,255,255,0.03)",
};

const rowOdd = {
  background: "transparent",
};

const roleBadge = (role) => ({
  padding: "5px 10px",
  borderRadius: "8px",
  fontWeight: "bold",
  color: "white",
  background:
    role === "ADMIN"
      ? "#ef4444"
      : role === "OWNER"
      ? "#3b82f6"
      : "#10b981",
});