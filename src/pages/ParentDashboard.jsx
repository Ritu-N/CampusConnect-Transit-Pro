import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ParentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = () => {
      axios
        .get("http://localhost:5000/dashboard/parent")
        .then((res) => setDashboard(res.data))
        .catch((err) => console.error(err));
    };

    loadDashboard();
    const interval = setInterval(loadDashboard, 10000);
    return () => clearInterval(interval);
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

  const { student, driver, bus, notifications } = dashboard;
  const center = bus.location || [13.0893, 80.2785];
  const routePositions = bus.routePolyline || [];
  const stopPositions = bus.stopLocations || [];

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px 36px" }}>
          <header style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "flex-end", gap: "18px" }}>
            <div>
              <p style={subtleLabel}>Parent Dashboard</p>
              <h1 style={pageTitle}>Student Live Tracking</h1>
            </div>
            <div style={statusPill}>Updated {new Date().toLocaleTimeString()}</div>
          </header>

          <section style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(220px, 1fr))", gap: "20px", marginTop: "24px" }}>
            <SummaryCard label="Student Name" value={student.name} />
            <SummaryCard label="Class" value={student.class} />
            <SummaryCard label="Roll Number" value={student.rollNumber} />
            <SummaryCard label="Assigned Bus" value={student.assignedBusNumber} />
            <SummaryCard label="Assigned Driver" value={driver.name} />
            <SummaryCard label="Driver Phone" value={driver.phone} />
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px", marginTop: "24px" }}>
            <div style={panel}>
              <div style={panelHeader}>
                <div>
                  <p style={subtleLabel}>Live Bus Tracking</p>
                  <h2 style={sectionTitle}>{bus.routeName}</h2>
                </div>
                <span style={statusBadge}>{bus.status}</span>
              </div>

              <div style={{ height: "420px", borderRadius: "20px", overflow: "hidden" }}>
                <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={bus.location}>
                    <Popup>
                      <strong>{bus.number}</strong>
                      <br />Driver: {driver.name}
                      <br />Speed: {bus.speed}
                      <br />ETA: {bus.eta}
                      <br />Status: {bus.status}
                    </Popup>
                  </Marker>
                  <Marker position={bus.schoolLocation}>
                    <Popup>🏫 School Location</Popup>
                  </Marker>
                  {stopPositions.map((position, index) => (
                    <Marker key={index} position={position}>
                      <Popup>{bus.routeName} stop {index + 1}</Popup>
                    </Marker>
                  ))}
                  {routePositions.length > 0 && (
                    <Polyline positions={routePositions} pathOptions={{ color: "#38bdf8", weight: 5, dashArray: "8 8" }} />
                  )}
                </MapContainer>
              </div>
            </div>

            <div style={panel}>
              <p style={subtleLabel}>Trip Summary</p>
              <h2 style={sectionTitle}>Current Route Overview</h2>
              <DetailRow label="Bus Number" value={bus.number} />
              <DetailRow label="Driver" value={driver.name} />
              <DetailRow label="Driver Phone" value={driver.phone} />
              <DetailRow label="Current Stop" value={bus.currentStop} />
              <DetailRow label="Next Stop" value={bus.nextStop} />
              <DetailRow label="Route Name" value={bus.routeName} />
              <DetailRow label="Departure" value={bus.departureTime} />
              <DetailRow label="Expected Arrival" value={bus.expectedArrival} />
              <DetailRow label="Trip Status" value={bus.tripStatus} />
            </div>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: "24px", marginTop: "24px" }}>
            <div style={panel}>
              <div style={panelHeader}>
                <p style={subtleLabel}>Recent Notifications</p>
                <span style={{ color: "#a5b4fc", fontSize: "0.95rem" }}>{notifications.length} updates</span>
              </div>
              <div style={{ display: "grid", gap: "14px" }}>
                {notifications.length === 0 ? (
                  <div style={emptyState}>No notifications available yet.</div>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} style={notificationCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <div>
                          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>{item.title}</p>
                          <p style={{ margin: "8px 0 0", color: "#cbd5e1" }}>{item.message}</p>
                        </div>
                        <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{item.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={panel}>
              <p style={subtleLabel}>Quick Actions</p>
              <h2 style={sectionTitle}>Take Action</h2>
              <div style={{ display: "grid", gap: "14px" }}>
                <ActionButton onClick={() => navigate("/trackbus")} label="Track Bus" />
                <ActionButton onClick={() => (window.location.href = `tel:${driver.phone}`)} label="Call Driver" secondary />
                <ActionButton onClick={() => navigate("/emergency")} label="Emergency" secondary />
                <ActionButton onClick={() => navigate("/history")} label="View History" />
                <ActionButton onClick={() => navigate("/profile")} label="Student Profile" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div style={statCard}>
      <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>{label}</p>
      <p style={{ margin: "14px 0 0", fontSize: "1.7rem", fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", gap: "12px" }}>
      <span style={{ color: "#94a3b8" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#f8fafc" }}>{value}</span>
    </div>
  );
}

function ActionButton({ onClick, label, secondary }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "15px 18px",
        borderRadius: "14px",
        border: "none",
        cursor: "pointer",
        background: secondary ? "#1e293b" : "#2563eb",
        color: "white",
        fontWeight: 700,
        boxShadow: secondary ? "none" : "0 12px 20px rgba(37, 99, 235, 0.25)",
        transition: "transform 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {label}
    </button>
  );
}

const panel = {
  background: "#10233f",
  borderRadius: "24px",
  padding: "26px",
  boxShadow: "0 18px 45px rgba(0, 0, 0, 0.22)",
};

const panelHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  gap: "14px",
};

const statCard = {
  background: "#0f172a",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 14px 30px rgba(0, 0, 0, 0.16)",
};

const statusBadge = {
  padding: "10px 18px",
  borderRadius: "999px",
  background: "#14b8a6",
  color: "white",
  fontWeight: 700,
  fontSize: "0.95rem",
};

const notificationCard = {
  background: "#0b1728",
  borderRadius: "18px",
  padding: "18px",
  border: "1px solid #1f2a44",
};

const emptyState = {
  padding: "26px",
  borderRadius: "18px",
  background: "#0b1728",
  color: "#94a3b8",
  textAlign: "center",
};

const subtleLabel = {
  margin: 0,
  color: "#94a3b8",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: "0.88rem",
};

const sectionTitle = {
  margin: "10px 0 0",
  fontSize: "1.9rem",
};

const pageTitle = {
  margin: "10px 0 0",
  fontSize: "2.3rem",
};

const statusPill = {
  background: "#152337",
  borderRadius: "999px",
  color: "#e0f2fe",
  padding: "12px 18px",
  fontSize: "0.95rem",
};

export default ParentDashboard;
