import { useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function AddStore() {
  const [form, setForm] = useState({
    name: "",
    owner_name: "",
    location: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await API.post("/admin/add-store", form);
      alert("Store added successfully");
    } catch (err) {
      console.log("Add store error:", err.response?.data || err.message);
      alert("Error adding store: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <AdminLayout>
      <h2 style={heading}>Add Store</h2>

      <div style={container}>
        <div style={card}>

          <input
            name="name"
            placeholder="Store Name"
            onChange={handleChange}
            style={input}
          />

          <input
            name="owner_name"
            placeholder="Owner Name"
            onChange={handleChange}
            style={input}
          />

          <textarea
            name="location"
            placeholder="Location / Address"
            onChange={handleChange}
            style={textarea}
          />

          <input
            name="email"
            placeholder="Store Admin Email"
            onChange={handleChange}
            style={input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={input}
          />

          <button onClick={submit} style={button}>
            Create Store
          </button>

        </div>
      </div>
    </AdminLayout>
  );
}

export default AddStore;
const heading = {
  color: "white",
  marginBottom: "20px",
  textAlign: "center",
};

const container = {
  display: "flex",
  justifyContent: "center",
};

const card = {
  width: "400px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const textarea = {
  ...input,
  height: "80px",
  resize: "none",
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};