import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DriverDashboard() {
  const [driverData, setDriverData] = useState(null);
  const [tripStatus, setTripStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/driver?driverId=1")
      .then((res) => {
        setDriverData(res.data);
        setTripStatus(res.data.bus?.status || "Idle");
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleTrip = (status) => {
    if (!driverData?.bus) return;
    const updatedStatus = status === "start" ? "On Route" : "Idle";
    axios
      .put(`http://localhost:5000/buses/${driverData.bus.id}`, {
        status: updatedStatus,
      })
      .then((res) => {
        setTripStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  };

  if (!driverData) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "60px 40px", color: "white", background: "#090b14", minHeight: "100vh" }}>
            <h2>Loading Driver Dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  const cardStyle = {
    background: "#10233f",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px 36px" }}>
          <h1>👨‍✈️ Driver Dashboard</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(200px, 1fr))", gap: "20px", margin: "24px 0" }}>
            <div style={cardStyle}>
              <p style={{ color: "#94a3b8", margin: 0 }}>Driver</p>
              <h2 style={{ marginTop: "12px" }}>{driverData.driver.name}</h2>
              <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>{driverData.driver.phone}</p>
            </div>
            <div style={cardStyle}>
              <p style={{ color: "#94a3b8", margin: 0 }}>Assigned Bus</p>
              <h2 style={{ marginTop: "12px" }}>{driverData.bus?.number || "Unassigned"}</h2>
              <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>{driverData.bus?.routeName || "Unassigned"}</p>
            </div>
            <div style={cardStyle}>
              <p style={{ color: "#94a3b8", margin: 0 }}>Trip Status</p>
              <h2 style={{ marginTop: "12px" }}>{tripStatus}</h2>
              <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>Next stop: {driverData.nextStop}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={cardStyle}>
              <h3>Route Overview</h3>
              <p style={{ color: "#94a3b8" }}>Current Stop</p>
              <p>{driverData.currentStop}</p>
              <p style={{ marginTop: "14px", color: "#94a3b8" }}>Route</p>
              <p>{driverData.route?.name || "Not assigned"}</p>
              <div style={{ marginTop: "16px" }}>
                {driverData.route?.stops?.map((stop, index) => (
                  <p key={index} style={{ margin: "8px 0", color: index === 0 ? "#38bdf8" : "#cbd5e1" }}>
                    {index + 1}. {stop}
                  </p>
                ))}
              </div>
            </div>
            <div style={cardStyle}>
              <h3>Trip Controls</h3>
              <button
                onClick={() => toggleTrip("start")}
                style={buttonStyle}
              >
                Start Trip
              </button>
              <button
                onClick={() => toggleTrip("end")}
                style={{ ...buttonStyle, background: "#ef4444" }}
              >
                End Trip
              </button>
              <div style={{ marginTop: "18px", color: "#94a3b8" }}>
                <p>Driver can use this panel during the route to update trip status.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  marginBottom: "14px",
  background: "#22c55e",
  color: "white",
  fontWeight: "700",
};

export default DriverDashboard;
