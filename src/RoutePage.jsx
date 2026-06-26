import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function RoutePage() {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedAssignments, setSelectedAssignments] = useState({});

  useEffect(() => {
    loadRoutes();
    loadBuses();
  }, []);

  const loadRoutes = () => {
    axios.get("http://localhost:5000/routes").then((res) => setRoutes(res.data)).catch((err) => console.error(err));
  };

  const loadBuses = () => {
    axios.get("http://localhost:5000/buses").then((res) => setBuses(res.data)).catch((err) => console.error(err));
  };

  const assignBus = (routeId) => {
    const busId = selectedAssignments[routeId] || "";
    axios
      .put(`http://localhost:5000/routes/${routeId}`, { assignedBusId: busId ? Number(busId) : null })
      .then(() => loadRoutes())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px" }}>
          <h1>📍 Routes</h1>
          <div style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
            {routes.map((route) => (
              <div key={route.id} style={routeCard}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "18px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 320px" }}>
                    <h2 style={{ margin: "0 0 12px" }}>{route.name}</h2>
                    <p style={{ margin: "0 0 12px", color: "#cbd5e1" }}>Stops: {route.stops.join(" → ")}</p>
                    <p style={{ margin: 0, color: "#94a3b8" }}>Assigned Bus: {route.assignedBusNumber || "Unassigned"}</p>
                  </div>
                  <div style={{ minWidth: "220px", display: "grid", gap: "12px" }}>
                    <select
                      value={selectedAssignments[route.id] ?? route.assignedBusId ?? ""}
                      onChange={(e) => setSelectedAssignments((prev) => ({ ...prev, [route.id]: e.target.value }))}
                      style={selectStyle}
                    >
                      <option value="">Unassigned</option>
                      {buses.map((bus) => (
                        <option key={bus.id} value={bus.id}>{bus.number}</option>
                      ))}
                    </select>
                    <button style={primaryButton} onClick={() => assignBus(route.id)}>
                      Assign Bus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const routeCard = {
  background: "#10233f",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 18px 30px rgba(0,0,0,0.2)",
};

const selectStyle = {
  borderRadius: "14px",
  border: "1px solid #1f2a44",
  background: "#0d1324",
  color: "white",
  padding: "12px 14px",
};

const primaryButton = {
  borderRadius: "14px",
  padding: "14px 18px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default RoutePage;
