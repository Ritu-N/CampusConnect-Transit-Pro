import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

  const submitNotification = () => {
    if (!title || !message) {
      alert("Please enter both title and message.");
      return;
    }

    axios
      .post("http://localhost:5000/notifications", { title, message })
      .then((res) => setNotifications([res.data, ...notifications]))
      .catch((err) => console.error(err));

    setTitle("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", color: "white", minHeight: "100vh", padding: "30px" }}>
          <h1>🔔 Notifications</h1>
          <div style={panelStyle}>
            <h2>Create Notification</h2>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={inputStyle}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={4}
              style={{ ...inputStyle, minHeight: "110px" }}
            />
            <button style={primaryButton} onClick={submitNotification}>
              Send Notification
            </button>
          </div>

          <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
            {notifications.map((item) => (
              <div key={item.id} style={notificationCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                    <p style={{ margin: "10px 0 0", color: "#cbd5e1" }}>{item.message}</p>
                  </div>
                  <span style={{ color: "#94a3b8" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const panelStyle = {
  background: "#10233f",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 18px 30px rgba(0,0,0,0.18)",
};

const notificationCard = {
  background: "#10233f",
  borderRadius: "18px",
  padding: "20px",
  boxShadow: "0 18px 30px rgba(0,0,0,0.16)",
};

const inputStyle = {
  width: "100%",
  borderRadius: "14px",
  border: "1px solid #1f2a44",
  background: "#0d1324",
  color: "white",
  padding: "14px 16px",
};

const primaryButton = {
  border: "none",
  borderRadius: "14px",
  padding: "14px 20px",
  background: "#22c55e",
  color: "white",
  cursor: "pointer",
  marginTop: "12px",
};

export default Notifications;
