import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [newDriver, setNewDriver] = useState({ name: "", phone: "", assignedBusId: "" });
  const [newBus, setNewBus] = useState({ number: "", capacity: "", driverId: "", routeId: "" });
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    loadAdmin();
    loadDrivers();
    loadBuses();
    loadRoutes();
  }, []);

  const loadAdmin = () => {
    axios.get("http://localhost:5000/dashboard/admin").then((res) => setDashboard(res.data)).catch((err) => console.log(err));
  };

  const loadDrivers = () => {
    axios.get("http://localhost:5000/drivers").then((res) => setDrivers(res.data)).catch((err) => console.log(err));
  };

  const loadBuses = () => {
    axios.get("http://localhost:5000/buses").then((res) => setBuses(res.data)).catch((err) => console.log(err));
  };

  const loadRoutes = () => {
    axios.get("http://localhost:5000/routes").then((res) => setRoutes(res.data)).catch((err) => console.log(err));
  };

  const addDriver = () => {
    if (!newDriver.name || !newDriver.phone) {
      alert("Driver name and phone are required");
      return;
    }
    axios
      .post("http://localhost:5000/drivers", {
        name: newDriver.name,
        phone: newDriver.phone,
        assignedBusId: newDriver.assignedBusId ? Number(newDriver.assignedBusId) : null,
      })
      .then(() => {
        setNewDriver({ name: "", phone: "", assignedBusId: "" });
        loadDrivers();
        loadBuses();
        loadAdmin();
      })
      .catch((err) => console.log(err));
  };

  const addBus = () => {
    if (!newBus.number || !newBus.capacity) {
      alert("Bus number and capacity are required");
      return;
    }
    axios
      .post("http://localhost:5000/buses", {
        number: newBus.number,
        capacity: Number(newBus.capacity),
        driverId: newBus.driverId ? Number(newBus.driverId) : null,
        routeId: newBus.routeId ? Number(newBus.routeId) : null,
      })
      .then(() => {
        setNewBus({ number: "", capacity: "", driverId: "", routeId: "" });
        loadBuses();
        loadDrivers();
        loadRoutes();
        loadAdmin();
      })
      .catch((err) => console.log(err));
  };

  const updateDriver = () => {
    if (!selectedDriver) return;
    axios
      .put(`http://localhost:5000/drivers/${selectedDriver.id}`, {
        name: selectedDriver.name,
        phone: selectedDriver.phone,
        status: selectedDriver.status,
        assignedBusId: selectedDriver.assignedBusId,
      })
      .then(() => {
        setSelectedDriver(null);
        loadDrivers();
        loadBuses();
        loadRoutes();
      })
      .catch((err) => console.log(err));
  };

  const updateBus = () => {
    if (!selectedBus) return;
    axios
      .put(`http://localhost:5000/buses/${selectedBus.id}`, {
        number: selectedBus.number,
        capacity: Number(selectedBus.capacity),
        driverId: selectedBus.driverId ? Number(selectedBus.driverId) : null,
        routeId: selectedBus.routeId ? Number(selectedBus.routeId) : null,
        status: selectedBus.status,
      })
      .then(() => {
        setSelectedBus(null);
        loadBuses();
        loadDrivers();
        loadRoutes();
      })
      .catch((err) => console.log(err));
  };

  const deleteDriver = (id) => {
    if (!window.confirm("Delete this driver?")) return;
    axios.delete(`http://localhost:5000/drivers/${id}`).then(() => {
      loadDrivers();
      loadBuses();
      loadAdmin();
    });
  };

  const deleteBus = (id) => {
    if (!window.confirm("Delete this bus?")) return;
    axios.delete(`http://localhost:5000/buses/${id}`).then(() => {
      loadBuses();
      loadDrivers();
      loadRoutes();
      loadAdmin();
    });
  };

  const assignRoute = (busId, routeId) => {
    axios
      .put(`http://localhost:5000/buses/${busId}`, {
        routeId: routeId ? Number(routeId) : null,
      })
      .then(() => {
        loadBuses();
        loadRoutes();
      })
      .catch((err) => console.log(err));
  };

  if (!dashboard) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "60px 40px", color: "white", background: "#090b14", minHeight: "100vh" }}>
            <h2>Loading Admin Dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px 36px" }}>
          <h1>🛠️ Admin Dashboard</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(160px, 1fr))", gap: "20px", marginBottom: "24px" }}>
            <SmallCard label="Total Students" value={dashboard.totalStudents} />
            <SmallCard label="Total Drivers" value={dashboard.totalDrivers} />
            <SmallCard label="Total Buses" value={dashboard.totalBuses} />
            <SmallCard label="Active Routes" value={dashboard.activeRoutes} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
            <div style={panelStyle}>
              <h2>Drivers</h2>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Bus</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver.id}>
                      <td style={tdStyle}>{driver.name}</td>
                      <td style={tdStyle}>{driver.phone}</td>
                      <td style={tdStyle}>{driver.busNumber}</td>
                      <td style={tdStyle}>{driver.status}</td>
                      <td style={tdStyle}>
                        <button style={actionButton} onClick={() => setSelectedDriver({ ...driver, assignedBusId: driver.assignedBusId || "" })}>
                          Edit
                        </button>
                        <button style={{ ...actionButton, background: "#ef4444" }} onClick={() => deleteDriver(driver.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={panelStyle}>
              <h2>Add Driver</h2>
              <div style={fieldGroup}>
                <label>Name</label>
                <input style={inputStyle} value={newDriver.name} onChange={(e) => setNewDriver((prev) => ({ ...prev, name: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Phone</label>
                <input style={inputStyle} value={newDriver.phone} onChange={(e) => setNewDriver((prev) => ({ ...prev, phone: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Assign Bus</label>
                <select style={inputStyle} value={newDriver.assignedBusId} onChange={(e) => setNewDriver((prev) => ({ ...prev, assignedBusId: e.target.value }))}>
                  <option value="">Unassigned</option>
                  {buses.map((bus) => (
                    <option key={bus.id} value={bus.id}>{bus.number}</option>
                  ))}
                </select>
              </div>
              <button style={primaryButton} onClick={addDriver}>Add Driver</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginTop: "24px" }}>
            <div style={panelStyle}>
              <h2>Buses</h2>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Bus</th>
                    <th style={thStyle}>Capacity</th>
                    <th style={thStyle}>Driver</th>
                    <th style={thStyle}>Route</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td style={tdStyle}>{bus.number}</td>
                      <td style={tdStyle}>{bus.capacity}</td>
                      <td style={tdStyle}>{bus.driverName}</td>
                      <td style={tdStyle}>{bus.routeName}</td>
                      <td style={tdStyle}>{bus.status}</td>
                      <td style={tdStyle}>
                        <button style={actionButton} onClick={() => setSelectedBus({ ...bus, driverId: bus.driverId || "", routeId: bus.routeId || "" })}>
                          Edit
                        </button>
                        <button style={{ ...actionButton, background: "#ef4444" }} onClick={() => deleteBus(bus.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={panelStyle}>
              <h2>Add Bus</h2>
              <div style={fieldGroup}>
                <label>Bus Number</label>
                <input style={inputStyle} value={newBus.number} onChange={(e) => setNewBus((prev) => ({ ...prev, number: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Capacity</label>
                <input style={inputStyle} type="number" value={newBus.capacity} onChange={(e) => setNewBus((prev) => ({ ...prev, capacity: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Driver</label>
                <select style={inputStyle} value={newBus.driverId} onChange={(e) => setNewBus((prev) => ({ ...prev, driverId: e.target.value }))}>
                  <option value="">Unassigned</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
              </div>
              <div style={fieldGroup}>
                <label>Route</label>
                <select style={inputStyle} value={newBus.routeId} onChange={(e) => setNewBus((prev) => ({ ...prev, routeId: e.target.value }))}>
                  <option value="">Unassigned</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
              </div>
              <button style={primaryButton} onClick={addBus}>Add Bus</button>
            </div>
          </div>

          {selectedDriver && (
            <div style={{ ...panelStyle, marginTop: "24px" }}>
              <h2>Edit Driver</h2>
              <div style={fieldGroup}>
                <label>Name</label>
                <input style={inputStyle} value={selectedDriver.name} onChange={(e) => setSelectedDriver((prev) => ({ ...prev, name: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Phone</label>
                <input style={inputStyle} value={selectedDriver.phone} onChange={(e) => setSelectedDriver((prev) => ({ ...prev, phone: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Status</label>
                <select style={inputStyle} value={selectedDriver.status} onChange={(e) => setSelectedDriver((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Available">Available</option>
                  <option value="Assigned">Assigned</option>
                  <option value="On Route">On Route</option>
                </select>
              </div>
              <button style={primaryButton} onClick={updateDriver}>Save Changes</button>
              <button style={{ ...secondaryButton, marginLeft: "12px" }} onClick={() => setSelectedDriver(null)}>
                Cancel
              </button>
            </div>
          )}

          {selectedBus && (
            <div style={{ ...panelStyle, marginTop: "24px" }}>
              <h2>Edit Bus</h2>
              <div style={fieldGroup}>
                <label>Bus Number</label>
                <input style={inputStyle} value={selectedBus.number} onChange={(e) => setSelectedBus((prev) => ({ ...prev, number: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Capacity</label>
                <input style={inputStyle} type="number" value={selectedBus.capacity} onChange={(e) => setSelectedBus((prev) => ({ ...prev, capacity: e.target.value }))} />
              </div>
              <div style={fieldGroup}>
                <label>Driver</label>
                <select style={inputStyle} value={selectedBus.driverId || ""} onChange={(e) => setSelectedBus((prev) => ({ ...prev, driverId: e.target.value }))}>
                  <option value="">Unassigned</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
              </div>
              <div style={fieldGroup}>
                <label>Route</label>
                <select style={inputStyle} value={selectedBus.routeId || ""} onChange={(e) => setSelectedBus((prev) => ({ ...prev, routeId: e.target.value }))}>
                  <option value="">Unassigned</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>{route.name}</option>
                  ))}
                </select>
              </div>
              <div style={fieldGroup}>
                <label>Status</label>
                <select style={inputStyle} value={selectedBus.status} onChange={(e) => setSelectedBus((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Available">Available</option>
                  <option value="Assigned">Assigned</option>
                  <option value="On Route">On Route</option>
                </select>
              </div>
              <button style={primaryButton} onClick={updateBus}>Save Changes</button>
              <button style={{ ...secondaryButton, marginLeft: "12px" }} onClick={() => setSelectedBus(null)}>
                Cancel
              </button>
            </div>
          )}

          <div style={{ ...panelStyle, marginTop: "24px" }}>
            <h2>Routes</h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {routes.map((route) => (
                <div key={route.id} style={{ padding: "18px", background: "#0f172a", borderRadius: "16px" }}>
                  <h3 style={{ margin: 0 }}>{route.name}</h3>
                  <p style={{ color: "#94a3b8", margin: "8px 0 12px" }}>
                    Stops: {route.stops.join(" → ")}
                  </p>
                  <p style={{ margin: 0 }}>Assigned Bus: {route.assignedBusNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SmallCard({ label, value }) {
  return (
    <div style={{ background: "#10233f", borderRadius: "18px", padding: "22px", boxShadow: "0 12px 30px rgba(0,0,0,0.16)" }}>
      <p style={{ margin: 0, color: "#94a3b8" }}>{label}</p>
      <h2 style={{ marginTop: "14px" }}>{value}</h2>
    </div>
  );
}

const panelStyle = {
  background: "#10233f",
  borderRadius: "22px",
  padding: "26px",
  boxShadow: "0 18px 35px rgba(0,0,0,0.16)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "16px",
};

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  color: "#94a3b8",
  borderBottom: "1px solid #1f2a44",
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #1f2a44",
  color: "white",
};

const actionButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  padding: "8px 12px",
  cursor: "pointer",
  marginRight: "8px",
};

const primaryButton = {
  width: "100%",
  padding: "14px 18px",
  border: "none",
  borderRadius: "14px",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
  marginTop: "14px",
};

const secondaryButton = {
  width: "100%",
  padding: "14px 18px",
  border: "1px solid #334155",
  borderRadius: "14px",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  marginTop: "14px",
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "14px",
};

const inputStyle = {
  background: "#0f172a",
  border: "1px solid #1f2a44",
  borderRadius: "12px",
  color: "white",
  padding: "12px 14px",
};

export default AdminDashboard;
