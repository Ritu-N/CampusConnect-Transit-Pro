function App() {
  return (
    <div
      style={{
        backgroundColor: "#07101f",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>CampusConnect Transit Pro</h1>

      <button
        style={{
          backgroundColor: "#00e5ff",
          color: "black",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Track Bus
      </button>

      <div
        style={{
          backgroundColor: "#10233f",
          height: "300px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        Live Map Coming Soon 🚍
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <div
          style={{
            backgroundColor: "#10233f",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          ETA
          <h2>15 min</h2>
        </div>

        <div
          style={{
            backgroundColor: "#10233f",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Distance
          <h2>1.5 km</h2>
        </div>

        <div
          style={{
            backgroundColor: "#10233f",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Speed
          <h2>42 km/h</h2>
        </div>
      </div>
    </div>
  )
}

export default App