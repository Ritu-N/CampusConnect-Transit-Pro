import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Emergency() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/emergency")
      .then((res) => setDetails(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!details) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "60px 40px", color: "white", background: "#090b14", minHeight: "100vh" }}>
            <h2>Loading Emergency Contacts...</h2>
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
          <h1>🚨 Emergency Contact</h1>
          <div style={cardStyle}>
            <h2>👨 Driver</h2>
            <p>Name: {details.driver.name}</p>
            <p>Phone: {details.driver.phone}</p>
            <button style={buttonStyle}>📞 Call Driver</button>
          </div>
          <div style={cardStyle}>
            <h2>🏫 College Transport Office</h2>
            <p>Phone: {details.office.phone}</p>
            <button style={buttonStyle}>☎ Call Office</button>
          </div>
          <div style={cardStyle}>
            <h2>🚑 Emergency Helpline</h2>
            <p>Police: {details.emergency.police}</p>
            <p>Ambulance: {details.emergency.ambulance}</p>
            <button style={buttonStyle}>🚨 SOS</button>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  background: "#10233f",
  color: "white",
  padding: "25px",
  borderRadius: "18px",
  marginBottom: "20px",
  boxShadow: "0 18px 30px rgba(0,0,0,0.18)",
};

const buttonStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: "14px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "18px",
};

export default Emergency;
