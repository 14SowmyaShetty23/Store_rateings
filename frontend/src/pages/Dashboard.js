import { useEffect, useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <AdminLayout>
      <h1 style={{ margin: 0, color: "white" }}>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={card}>Users: {data.users}</div>
        <div style={card}>Stores: {data.stores}</div>
        <div style={card}>Ratings: {data.ratings}</div>
      </div>
    </AdminLayout>
  );
}
const card = {
  flex: 1,
  padding: "25px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  color: "white",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "0.3s",
  textAlign: "center",
};

export default Dashboard;