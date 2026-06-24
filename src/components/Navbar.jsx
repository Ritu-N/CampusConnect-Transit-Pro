function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "#10233f",
padding: "20px 30px",
boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        
        color: "white",
       
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f3b63"
      }}
    >
      <h2>🚌 CampusConnect Transit Pro</h2>

      <div>
        🔔 Notifications
      </div>
    </div>
  )
}

export default Navbar