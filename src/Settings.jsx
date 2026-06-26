import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Settings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/settings")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleSetting = (field) => {
    if (!settings) return;
    const updated = { ...settings };

    if (field === "theme") {
      updated.theme = settings.theme === "dark" ? "light" : "dark";
    } else {
      updated[field] = !settings[field];
    }

    axios
      .put("http://localhost:5000/settings", updated)
      .then((res) => setSettings(res.data))
      .catch((err) => console.error(err));
  };

  if (!settings) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "60px 40px", color: "white", background: "#090b14", minHeight: "100vh" }}>
            <h2>Loading Settings...</h2>
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
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px" }}>
          <h1>⚙️ Settings</h1>
          <div style={panelStyle}>
            <SettingRow label="Theme" value={settings.theme || "dark"} onToggle={() => toggleSetting("theme")} />
            <SettingRow label="Notifications" value={settings.notificationsEnabled ? "On" : "Off"} onToggle={() => toggleSetting("notificationsEnabled")} />
            <SettingRow label="Auto Route Updates" value={settings.autoRouteUpdates ? "Enabled" : "Disabled"} onToggle={() => toggleSetting("autoRouteUpdates")} />
          </div>
        </div>
      </div>
    </>
  );
}

function SettingRow({ label, value, onToggle }) {
  return (
    <div style={rowStyle}>
      <div>
        <p style={{ margin: 0, fontSize: "18px" }}>{label}</p>
        <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>{value}</p>
      </div>
      <button style={toggleButton} onClick={onToggle}>Toggle</button>
    </div>
  );
}

const panelStyle = {
  background: "#10233f",
  borderRadius: "18px",
  padding: "24px",
  display: "grid",
  gap: "18px",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px",
  borderRadius: "16px",
  background: "#0f172a",
};

const toggleButton = {
  border: "none",
  borderRadius: "14px",
  padding: "12px 18px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default Settings;
