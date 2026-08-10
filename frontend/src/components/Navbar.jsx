function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>Task Manager</h1>
      </div>

      <div className="navbar-actions">
        <span className="user-name">Welcome 👋</span>

        <button className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;