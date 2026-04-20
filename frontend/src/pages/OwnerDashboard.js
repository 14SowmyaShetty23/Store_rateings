import { useEffect, useState } from "react";
import API from "../api";

function OwnerDashboard() {
  const [stores, setStores] = useState([]); // grouped by store

  useEffect(() => {
    API.get("/ratings/store-owner")
      .then((res) => {
        setStores(groupByStore(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  // group flat rows into stores with nested ratings array
  const groupByStore = (rows) => {
    const map = {};
    rows.forEach((row) => {
      if (!map[row.store_id]) {
        map[row.store_id] = {
          store_id: row.store_id,
          store_name: row.store_name,
          address: row.address,
          avgRating: row.avgRating,
          totalRatings: row.totalRatings,
          ratings: [],
        };
      }
      if (row.user_name) {
        map[row.store_id].ratings.push({
          id: row.id,
          rating: row.rating,
          user_name: row.user_name,
          user_email: row.user_email,
        });
      }
    });
    return Object.values(map);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={page}>
      {/* NAVBAR */}
      <div style={navbar}>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Store Owner Dashboard</span>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      <div style={container}>
        {stores.length === 0 ? (
          <p style={{ color: "white" }}>No stores or ratings found.</p>
        ) : (
          stores.map((store) => (
            <div key={store.store_id} style={storeCard}>
              {/* Store Header */}
              <div style={storeHeader}>
                <div>
                  <h2 style={storeName}>{store.store_name}</h2>
                  <p style={storeAddress}>{store.address || "No address"}</p>
                </div>
                <div style={statBox}>
                  <div style={statItem}>
                    <span style={statValue}>⭐ {Number(store.avgRating).toFixed(1)}</span>
                    <span style={statLabel}>Avg Rating</span>
                  </div>
                  <div style={statItem}>
                    <span style={statValue}>{store.totalRatings}</span>
                    <span style={statLabel}>Total Ratings</span>
                  </div>
                </div>
              </div>

              {/* Ratings Table */}
              {store.ratings.length === 0 ? (
                <p style={{ color: "#94a3b8", padding: "10px 0" }}>No ratings yet.</p>
              ) : (
                <table style={table}>
                  <thead>
                    <tr>
                      <th style={th}>User</th>
                      <th style={th}>Email</th>
                      <th style={th}>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.ratings.map((r) => (
                      <tr key={r.id}>
                        <td style={td}>{r.user_name}</td>
                        <td style={td}>{r.user_email}</td>
                        <td style={td}>
                          <span style={ratingBadge(r.rating)}>
                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} ({r.rating})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 30px",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  backdropFilter: "blur(10px)",
};

const logoutBtn = {
  padding: "8px 16px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const container = {
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
};

const storeCard = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
};

const storeHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "16px",
};

const storeName = {
  color: "white",
  margin: "0 0 4px 0",
};

const storeAddress = {
  color: "#94a3b8",
  margin: 0,
  fontSize: "14px",
};

const statBox = {
  display: "flex",
  gap: "20px",
};

const statItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "rgba(255,255,255,0.1)",
  padding: "10px 20px",
  borderRadius: "12px",
};

const statValue = {
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
};

const statLabel = {
  color: "#94a3b8",
  fontSize: "12px",
  marginTop: "4px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "12px",
  textAlign: "left",
  background: "rgba(255,255,255,0.08)",
  color: "#e2e8f0",
  fontWeight: "600",
};

const td = {
  padding: "12px",
  color: "#e2e8f0",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

const ratingBadge = (rating) => ({
  padding: "4px 10px",
  borderRadius: "8px",
  fontWeight: "bold",
  background:
    rating >= 4 ? "#22c55e" : rating >= 2 ? "#f59e0b" : "#ef4444",
  color: "black",
  fontSize: "13px",
});
