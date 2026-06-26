import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        backgroundColor: "#0f172a",
        height: "100vh",
        position: "sticky",
        top: 0,
        color: "white",
        padding: "24px",
        boxSizing: "border-box",
        borderRight: "1px solid #1f2a44",
      }}
    >
      <h2 style={{ margin: "0 0 24px", fontSize: "20px" }}>CampusConnect</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Link to="/parent" style={linkStyle}>
          🏠 Parent Dashboard
        </Link>
        <Link to="/driver" style={linkStyle}>
          👨‍✈️ Driver Dashboard
        </Link>
        <Link to="/admin" style={linkStyle}>
          🛠️ Admin Dashboard
        </Link>
        <Link to="/trackbus" style={linkStyle}>
          🚌 Track Bus
        </Link>
        <Link to="/route" style={linkStyle}>
          📍 Routes
        </Link>
        <Link to="/students" style={linkStyle}>
          🎓 Students
        </Link>
        <Link to="/notifications" style={linkStyle}>
          🔔 Notifications
        </Link>
        <Link to="/history" style={linkStyle}>
          📜 Bus History
        </Link>
        <Link to="/profile" style={linkStyle}>
          👤 Profile
        </Link>
        <Link to="/settings" style={linkStyle}>
          ⚙️ Settings
        </Link>
        <Link to="/emergency" style={linkStyle}>
          🚨 Emergency
        </Link>
        <Link to="/" style={linkStyle}>
          🚪 Logout
        </Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px 16px",
  borderRadius: "12px",
  background: "#111827",
  display: "block",
};

export default Sidebar;
