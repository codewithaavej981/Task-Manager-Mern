import { useNavigate } from "react-router-dom";
function Navbar() {
const navigate = useNavigate();
  function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
}
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>Task Manager</h1>
      </div>

      <div className="navbar-actions">
        <span className="user-name">Welcome 👋</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;