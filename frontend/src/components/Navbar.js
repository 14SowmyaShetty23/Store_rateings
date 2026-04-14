// components/Navbar.js
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/add-user">Add User</Link>
      <Link to="/add-store">Add Store</Link>
      <Link to="/users">Users</Link>
      <Link to="/stores">Stores</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;