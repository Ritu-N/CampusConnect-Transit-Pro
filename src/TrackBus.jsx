import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function TrackBus() {
  const route = [
    [13.0827, 80.2707],
    [13.0838, 80.2719],
    [13.0850, 80.2735],
    [13.0862, 80.2750],
    [13.0875, 80.2768],
  ];

  const stops = [
    "Anna Nagar",
    "Koyambedu",
    "Vadapalani",
    "Guindy",
    "Campus",
  ];

  const status = [
    "Started",
    "On Route",
    "Near College",
    "Almost Reached",
    "Reached",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % route.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const busLocation = route[index];

  const cardStyle = {
    backgroundColor: "#10233f",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
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
            color: "white",
            minHeight: "100vh",
            padding: "30px",
          }}
        >
          <h1 style={{ marginBottom: "25px" }}>🚌 Track Bus</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <div style={cardStyle}>
              <h3>📍 Current Stop</h3>
              <h2>{stops[index]}</h2>
            </div>

            <div style={cardStyle}>
              <h3>⏱ ETA</h3>
              <h2>15 min</h2>
            </div>

            <div style={cardStyle}>
              <h3>⚡ Speed</h3>
              <h2>42 km/h</h2>
            </div>

            <div style={cardStyle}>
              <h3>🟢 Status</h3>
              <h2>{status[index]}</h2>
            </div>
          </div>

          <div
            style={{
              height: "450px",
              borderRadius: "15px",
              overflow: "hidden",
              marginBottom: "25px",
            }}
          >
            <MapContainer
              center={busLocation}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={busLocation}>
                <Popup>🚌 CampusConnect Bus</Popup>
              </Marker>
              <Polyline
  positions={route}
  pathOptions={{
    color: "#00bfff",
    weight: 5,
  }}
/>
{route.map((position, i) => (
  <Marker key={i} position={position}>
    <Popup>{stops[i]}</Popup>
  </Marker>
))}
            </MapContainer>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>🚌 Bus Number</h3>
              <h2>TN09 AB1234</h2>
            </div>

            <div style={cardStyle}>
              <h3>👨 Driver</h3>
              <h2>Ramesh Kumar</h2>
            </div>

            <div style={cardStyle}>
              <h3>🔄 Last Updated</h3>
              <h2>{new Date().toLocaleTimeString()}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackBus;