import { useState } from "react";
import API from "../api";
import AdminLayout from "../components/AdminLayout";

function AddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await API.post("/admin/add-store", form);
    alert("Store added");
  };

  return (
    <AdminLayout>
      <h2 style={heading}>Add Store</h2>

      <div style={card}>
        <input name="name" placeholder="Store Name" onChange={handleChange} style={input} />
        <input name="email" placeholder="Email" onChange={handleChange} style={input} />
        <textarea name="address" placeholder="Address" onChange={handleChange} style={textarea} />
        <input name="owner_id" placeholder="Owner ID" onChange={handleChange} style={input} />

        <button onClick={submit} style={button}>Create Store</button>
      </div>
    </AdminLayout>
  );
}

export default AddStore;
const heading = {
  color: "white",
  marginBottom: "20px",
};

const card = {
  maxWidth: "400px",
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