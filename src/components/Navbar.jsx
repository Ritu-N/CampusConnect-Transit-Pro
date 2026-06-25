import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#10233f",
        padding: "20px 30px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        borderBottom: "1px solid #1f3b63",
      }}
    >
      <h2 style={{ margin: 0 }}>🚌 CampusConnect Transit Pro</h2>

      <Link
        to="/notifications"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        🔔 Notifications
      </Link>
    </div>
  );
}

export default Navbar;