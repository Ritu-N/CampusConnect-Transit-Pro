import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Emergency() {
  const card = {
    background: "#10233f",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
  };

  const button = {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            background: "#15161d",
            minHeight: "100vh",
            color: "white",
            padding: "30px",
          }}
        >
          <h1>🚨 Emergency Contact</h1>

          <div style={card}>
            <h2>👨 Driver</h2>
            <p>Name: Ramesh Kumar</p>
            <p>Phone: +91 9876543210</p>

            <button style={button}>
              📞 Call Driver
            </button>
          </div>

          <div style={card}>
            <h2>🏫 College Transport Office</h2>
            <p>Phone: +91 9123456789</p>

            <button style={button}>
              ☎ Call Office
            </button>
          </div>

          <div style={card}>
            <h2>🚑 Emergency Helpline</h2>
            <p>Police : 100</p>
            <p>Ambulance : 108</p>

            <button style={button}>
              🚨 SOS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Emergency;