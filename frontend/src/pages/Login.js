// pages/Login.js
import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };
const handleLogin = async () => {
  try {
    console.log("Sending:", form);

    const res = await API.post("/auth/login", form);

    console.log("SUCCESS:", res.data);

    if (!res.data.token) {
      alert("No token received");
      return;
    }

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("ERROR DATA:", err.response?.data);
    alert("Login failed");
  }
};
  return (
    <div>
      <h2 style={{ margin: 0, color: "white" }}>Admin Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;