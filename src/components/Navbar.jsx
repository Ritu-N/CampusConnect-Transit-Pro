import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        padding: "18px 28px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f2a44",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "22px" }}>CampusConnect Transit Pro</h2>
        <p style={{ margin: "4px 0 0", color: "#94a3b8" }}>
          Real-time transit visibility for parents, drivers, and admins.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/notifications" style={buttonLinkStyle}>
          🔔 Notifications
        </Link>
        <Link to="/profile" style={buttonLinkStyle}>
          👤 Profile
        </Link>
      </div>
    </div>
  );
}

const buttonLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  padding: "10px 16px",
  borderRadius: "10px",
  background: "#111827",
};

export default Navbar;