import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ParentDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = () => {
      axios
        .get("http://localhost:5000/dashboard/parent")
        .then((res) => setDashboard(res.data))
        .catch((err) => console.log(err));
    };

    loadDashboard();
    const timer = setInterval(loadDashboard, 10000);
    return () => clearInterval(timer);
  }, []);

  if (!dashboard) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "60px 40px", color: "white", background: "#090b14", minHeight: "100vh" }}>
            <h2>Loading Parent Dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  const cardStyle = {
    backgroundColor: "#10233f",
    padding: "24px",
    borderRadius: "18px",
    flex: 1,
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.18)",
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", padding: "30px 36px", color: "white" }}>
          <h1>👨‍👩‍👧 Parent Dashboard</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(220px, 1fr))", gap: "20px", margin: "24px 0" }}>
            <div style={cardStyle}>
              <p style={{ margin: 0, color: "#94a3b8" }}>Active Buses</p>
              <h2 style={{ marginTop: "12px" }}>{dashboard.activeBuses}</h2>
            </div>
            <div style={cardStyle}>
              <p style={{ margin: 0, color: "#94a3b8" }}>Drivers</p>
              <h2 style={{ marginTop: "12px" }}>{dashboard.drivers}</h2>
            </div>
            <div style={cardStyle}>
              <p style={{ margin: 0, color: "#94a3b8" }}>Students</p>
              <h2 style={{ marginTop: "12px" }}>{dashboard.students}</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", marginBottom: "24px" }}>
            <div style={{ ...cardStyle, minHeight: "420px" }}>
              <h3 style={{ marginBottom: "18px" }}>Live Bus Tracking</h3>
              <div style={{ height: "100%", borderRadius: "18px", overflow: "hidden" }}>
                <MapContainer center={dashboard.currentBus.location} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={dashboard.currentBus.location}>
                    <Popup>🚌 {dashboard.currentBus.busNumber}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div style={cardStyle}>
              <h3 style={{ marginBottom: "18px" }}>Trip Summary</h3>
              <p style={{ marginBottom: "12px", color: "#94a3b8" }}>Bus</p>
              <h2 style={{ margin: "0 0 20px" }}>{dashboard.currentBus.busNumber}</h2>
              <InfoRow label="Driver" value={dashboard.currentBus.driver} />
              <InfoRow label="Route" value={dashboard.currentBus.route} />
              <InfoRow label="ETA" value={dashboard.currentBus.eta} />
              <InfoRow label="Speed" value={dashboard.currentBus.speed} />
              <InfoRow label="Status" value={dashboard.currentBus.status} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(180px, 1fr))", gap: "20px" }}>
            {[
              { label: "ETA", value: dashboard.currentBus.eta },
              { label: "Location", value: dashboard.currentBus.route },
              { label: "Status", value: dashboard.currentBus.status },
              { label: "Last updated", value: new Date().toLocaleTimeString() },
            ].map((item) => (
              <div key={item.label} style={cardStyle}>
                <p style={{ margin: 0, color: "#94a3b8" }}>{item.label}</p>
                <h3 style={{ marginTop: "12px" }}>{item.value}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <p style={{ margin: 0, color: "#94a3b8" }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontSize: "18px" }}>{value}</p>
    </div>
  );
}

export default ParentDashboard;
