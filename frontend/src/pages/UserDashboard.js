import { useEffect, useState } from "react";
import API from "../api";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [myRatings, setMyRatings] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("NONE");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "rated"
  const [userRatingMap, setUserRatingMap] = useState({}); // storeId -> user's rating

  const fetchStores = () => {
    API.get("/stores")
      .then((res) => setStores(res.data))
      .catch((err) => console.log(err));
  };

  const fetchMyRatings = () => {
    API.get("/ratings/my")
      .then((res) => {
        setMyRatings(res.data);
        // build a map of storeId -> rating for quick lookup
        const map = {};
        res.data.forEach((r) => (map[r.store_id] = r.rating));
        setUserRatingMap(map);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStores();
    fetchMyRatings();
  }, []);

  const handleRating = (storeId, rating) => {
    API.post("/ratings", { storeId, rating })
      .then((res) => {
        alert(res.data.message);
        fetchStores();
        fetchMyRatings();
      })
      .catch((err) => {
        console.log(err);
        alert("Error submitting rating");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // filter + sort
  const filtered = stores
    .filter((s) =>
      (s.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.address || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "HIGH") return b.avgRating - a.avgRating;
      if (sort === "LOW") return a.avgRating - b.avgRating;
      return 0;
    });

  const ratedStores = myRatings;

  return (
    <div style={page}>
      {/* NAVBAR */}
      <div style={navbar}>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>StoreRater</span>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      <div style={container}>
        {/* TABS */}
        <div style={tabs}>
          <button
            style={activeTab === "all" ? activeTabBtn : tabBtn}
            onClick={() => setActiveTab("all")}
          >
            All Stores
          </button>
          <button
            style={activeTab === "rated" ? activeTabBtn : tabBtn}
            onClick={() => setActiveTab("rated")}
          >
            My Rated Stores ({myRatings.length})
          </button>
        </div>

        {activeTab === "all" && (
          <>
            {/* SEARCH + SORT */}
            <div style={controls}>
              <input
                placeholder="Search by name or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={searchInput}
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={select}>
                <option value="NONE">Sort by Rating</option>
                <option value="HIGH">High to Low</option>
                <option value="LOW">Low to High</option>
              </select>
            </div>

            {/* STORE CARDS */}
            <div style={grid}>
              {filtered.map((store) => (
                <div key={store.id} style={card}>
                  <h3 style={storeName}>{store.name}</h3>
                  <p style={storeInfo}>{store.address || "No address"}</p>
                  <p style={storeInfo}>{store.email}</p>
                  <div style={ratingRow}>
                    <span style={avgBadge}>⭐ {Number(store.avgRating).toFixed(1)}</span>
                    {userRatingMap[store.id] && (
                      <span style={myBadge}>Your rating: {userRatingMap[store.id]}</span>
                    )}
                  </div>
                  <div style={starRow}>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRating(store.id, r)}
                        style={userRatingMap[store.id] === r ? activeStarBtn : starBtn}
                      >
                        {r}★
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "rated" && (
          <div style={grid}>
            {ratedStores.length === 0 ? (
              <p style={{ color: "white" }}>You haven't rated any stores yet.</p>
            ) : (
              ratedStores.map((r) => (
                <div key={r.id} style={card}>
                  <h3 style={storeName}>{r.name}</h3>
                  <p style={storeInfo}>{r.address || "No address"}</p>
                  <p style={storeInfo}>{r.email}</p>
                  <div style={ratingRow}>
                    <span style={avgBadge}>⭐ Avg: {Number(r.avgRating).toFixed(1)}</span>
                    <span style={myBadge}>Your rating: {r.rating}</span>
                  </div>
                  <div style={starRow}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleRating(r.store_id, val)}
                        style={r.rating === val ? activeStarBtn : starBtn}
                      >
                        {val}★
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1e1b4b, #312e81)",
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
};

const tabs = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tabBtn = {
  padding: "10px 20px",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const activeTabBtn = {
  ...tabBtn,
  background: "#6366f1",
  fontWeight: "bold",
};

const controls = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const searchInput = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const select = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const card = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: "20px",
  color: "white",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

const storeName = {
  margin: "0 0 8px 0",
  fontSize: "18px",
};

const storeInfo = {
  margin: "4px 0",
  fontSize: "13px",
  color: "#cbd5e1",
};

const ratingRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  margin: "10px 0",
};

const avgBadge = {
  background: "#22c55e",
  padding: "4px 10px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "bold",
};

const myBadge = {
  background: "#6366f1",
  padding: "4px 10px",
  borderRadius: "8px",
  fontSize: "13px",
};

const starRow = {
  display: "flex",
  gap: "6px",
  marginTop: "10px",
};

const starBtn = {
  padding: "6px 10px",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const activeStarBtn = {
  ...starBtn,
  background: "#f59e0b",
  fontWeight: "bold",
};
