import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#10233f",
        height: "100vh",
position: "sticky",
top: "0",
        color: "white",
        padding: "20px",
        transition: "0.3s"
      }}
    >
      <h3>Menu</h3>
      <Link to="/parent" style={{ color: "white", textDecoration: "none" }}>
  <p>🏠 Dashboard</p>
</Link>
<Link to="/trackbus" style={{ color: "white", textDecoration: "none" }}>
  <p>🚌 Track Bus</p>
</Link>
<Link to="/route" style={{ color: "white", textDecoration: "none" }}>
  <p>📍 Route</p>
</Link>
<Link to="/students" style={{ color: "white", textDecoration: "none" }}>
  <p>👨‍🎓 Students</p>
</Link>
<Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
  <p>⚙️ Settings</p>
</Link>
<Link to="/" style={{ color: "white", textDecoration: "none" }}>
  <p>🚪 Logout</p>
</Link>
<Link to="/profile">👤 Profile</Link>
<Link to="/history">📜 Bus History</Link>
<Link to="/emergency">🚨 Emergency</Link>
<Link
  to="/profile"
  style={{
    textDecoration: "none",
    color: "white",
    display: "block",
    margin: "12px 0",
    fontSize: "22px",
  }}
>
  👤 Profile
</Link>

    </div>
  )
}
export default Sidebar