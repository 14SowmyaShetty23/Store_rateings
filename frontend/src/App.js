// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import Users from "./pages/Users";
import Stores from "./pages/Stores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-store" element={<AddStore />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;