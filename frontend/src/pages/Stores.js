import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    API.get("/admin/stores").then((res) => setStores(res.data));
  }, []);
const handleDelete = async (id) => {
  if (!window.confirm("Delete this store?")) return;

  try {
    await API.delete(`/admin/delete-store/${id}`);

    // ✅ Update UI instantly
    setStores(stores.filter((s) => s.id !== id));

  } catch (err) {
    alert("Delete failed");
  }
};
  // 🔍 Search + Filter Logic
  const filteredStores = stores.filter((s) => {
    const matchesSearch =
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.address || "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL"
        ? true
        : filter === "HIGH"
        ? s.rating >= 4
        : filter === "MEDIUM"
        ? s.rating >= 2 && s.rating < 4
        : s.rating < 2;

    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <h2 style={{ color: "white" }}>Stores</h2>

      {/* 🔍 SEARCH + FILTER */}
      <div style={topControls}>
        <input
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={filterSelect}
        >
          <option value="ALL">All Ratings</option>
          <option value="HIGH">High (4-5)</option>
          <option value="MEDIUM">Medium (2-4)</option>
          <option value="LOW">Low (0-2)</option>
        </select>
      </div>

      {/* 🏪 TABLE */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Address</th>
            <th style={th}>Rating</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((s, index) => (
           <tr key={s.id}>
  <td style={td}>{s.name}</td>
  <td style={td}>{s.email}</td>
  <td style={td}>{s.address}</td>
  <td style={td}>
    <span style={ratingBadge(s.rating)}>
      ⭐ {Number(s.rating).toFixed(1)}
    </span>
  </td>

  {/* 🔥 DELETE BUTTON */}
  <td style={td}>
    <button
      style={deleteBtn}
      onClick={() => handleDelete(s.id)}
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

export default Stores;

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
const deleteBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
// const rowEven = {
//   background: "rgba(255,255,255,0.03)",
// };

// const rowOdd = {
//   background: "transparent",
// };

const ratingBadge = (rating) => ({
  padding: "5px 10px",
  borderRadius: "8px",
  fontWeight: "bold",
  background:
    rating >= 4
      ? "#22c55e"
      : rating >= 2
      ? "#facc15"
      : "#ef4444",
  color: "black",
});