import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function ParentDashboard() {
  const [busLocation, setBusLocation] = useState([13.0827, 80.2707]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => [
        prev[0] + 0.001,
        prev[1] + 0.001,
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    
  <>
    <Navbar />

    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>👨‍👩‍👧 Parent Dashboard</h1>

<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    marginTop: "20px",
    justifyContent: "space-between",
  }}
>
  <div
    style={{
      backgroundColor: "#10233f",
      padding: "20px",
      borderRadius: "10px",
    flex: 1,
    }}
  >
    <h3>🚌 Active Buses</h3>
    <h2>12</h2>
  </div>

  <div
    style={{
      backgroundColor: "#10233f",
      padding: "20px",
      borderRadius: "10px",
      flex: 1,
    }}
  >
    <h3>👨‍✈️ Drivers</h3>
    <h2>12</h2>
  </div>

  <div
    style={{
      backgroundColor: "#10233f",
      padding: "20px",
      borderRadius: "10px",
      flex: 1,
    }}
  >
    <h3>🎓 Students</h3>
    <h2>450</h2>
  </div>
</div>

        <div
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <MapContainer
            center={busLocation}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={busLocation}>
              <Popup>🚌 School Bus</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#10233f",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>ETA</h3>
            <h2>15 min</h2>
          </div>

          <div
            style={{
              backgroundColor: "#10233f",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Distance</h3>
            <h2>1.5 km</h2>
          </div>

          <div
            style={{
              backgroundColor: "#10233f",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Speed</h3>
            <h2>42 km/h</h2>
          </div>

          <div
  style={{
    backgroundColor: "#10233f",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
  }}
>
  <h3>🟢 Bus Status</h3>
  <h2>On Route</h2>
</div>

        </div>
      </div>
    </div>
  </>
);
  
}

export default ParentDashboard;