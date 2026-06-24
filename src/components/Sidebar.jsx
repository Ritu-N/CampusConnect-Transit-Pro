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

      <p style={{ cursor: "pointer" }}>🏠 Dashboard</p>
<p style={{ cursor: "pointer" }}>🚌 Track Bus</p>
<p style={{ cursor: "pointer" }}>📍 Route</p>
<p style={{ cursor: "pointer" }}>👨‍🎓 Students</p>
<p style={{ cursor: "pointer" }}>⚙️ Settings</p>
<p style={{ cursor: "pointer" }}>🚪 Logout</p>
    </div>
  )
}

export default Sidebar