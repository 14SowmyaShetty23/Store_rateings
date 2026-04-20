import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API from "../api";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email: form.email, password: form.password });
      if (!res.data.token) { alert("No token received"); return; }

      localStorage.setItem("token", res.data.token);
      const role = res.data.user?.role;
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/AdminDashboard");
      else if (role === "OWNER") navigate("/owner-dashboard");
      else navigate("/UserDashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "USER",
      });
      alert("Account created! Please login.");
      setIsSignup(false);
      setForm({ name: "", email: "", password: "", confirm: "" });
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  const toggle = () => {
    setIsSignup(!isSignup);
    setForm({ name: "", email: "", password: "", confirm: "" });
    setShowPassword(false);
    setShowConfirm(false);
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>{isSignup ? "Create Account" : "Welcome Back 👋"}</h2>

        {isSignup && (
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={input}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={input}
        />

        {/* Password field with eye toggle */}
        <div style={inputWrap}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ ...input, margin: 0, width: "100%" }}
          />
          <span style={eyeBtn} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
          </span>
        </div>

        {/* Confirm Password — signup only */}
        {isSignup && (
          <div style={{ ...inputWrap, marginTop: "15px" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              style={{ ...input, margin: 0, width: "100%" }}
            />
            <span style={eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
            </span>
          </div>
        )}

        <button
          onClick={isSignup ? handleSignup : handleLogin}
          style={btn}
          onMouseOver={(e) => (e.target.style.background = "#5a67d8")}
          onMouseOut={(e) => (e.target.style.background = "#667eea")}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p style={toggleText}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={toggleLink} onClick={toggle}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  fontFamily: "Arial",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  width: "320px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const title = { marginBottom: "20px", color: "#333" };

const input = {
  width: "85%",
  display: "block",
  margin: "0 auto 15px auto",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
  boxSizing: "border-box",
};

const inputWrap = {
  position: "relative",
  width: "85%",
  margin: "0 auto 15px auto",
};

const eyeBtn = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "16px",
  userSelect: "none",
};

const btn = {
  width: "85%",
  display: "block",
  margin: "10px auto 0 auto",
  padding: "10px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};

const toggleText = { marginTop: "15px", fontSize: "13px", color: "#777" };

const toggleLink = { color: "#667eea", cursor: "pointer", fontWeight: "bold" };
