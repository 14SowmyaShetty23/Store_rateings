import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  }, []);
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete?")) return;

  try {
    await API.delete(`/admin/delete-user/${id}`);

    // ✅ remove user from UI instantly
    setUsers(users.filter((u) => u.id !== id));

  } catch (err) {
    alert("Delete failed");
  }
};

  return (
    <AdminLayout>
     <h2 style={{ margin: 0, color: "white" }}>Users</h2>

     <table style={table}>
  <thead>
    <tr>
      <th style={th}>Name</th>
      <th style={th}>Email</th>
      <th style={th}>Address</th>
      <th style={th}>Role</th>
      <th style={th}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {users.map((u, index) => (
      <tr key={u.id}>
  <td style={td}>{u.name}</td>
  <td style={td}>{u.email}</td>
  <td style={td}>{u.address}</td>
  <td style={td}>
    <span style={roleBadge(u.role)}>{u.role}</span>
  </td>

  {/* 🔥 DELETE BUTTON */}
  <td style={td}>
    <button
      style={deleteBtn}
      onClick={() => handleDelete(u.id)}
    >
      Delete
    </button>
  </td>
</tr>
      
    ))}
  </tbody>
</table>
    </AdminLayout>
  );
}


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
  fontWeight: "600",
};
const deleteBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
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
  fontSize: "12px",
  fontWeight: "bold",
  color: "white",
  background:
    role === "ADMIN"
      ? "#ef4444"
      : role === "OWNER"
      ? "#3b82f6"
      : "#10b981",
});

export default Users;