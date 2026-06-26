import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function BusHistory() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/history")
      .then((res) => setTrips(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, background: "#090b14", minHeight: "100vh", color: "white", padding: "30px" }}>
          <h1>📜 Bus History</h1>
          <div style={{ marginTop: "24px", overflowX: "auto" }}>
            <table style={historyTable}>
              <thead>
                <tr>
                  <th style={headerStyle}>Date</th>
                  <th style={headerStyle}>Bus</th>
                  <th style={headerStyle}>From</th>
                  <th style={headerStyle}>To</th>
                  <th style={headerStyle}>Departure</th>
                  <th style={headerStyle}>Arrival</th>
                  <th style={headerStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id}>
                    <td style={bodyStyle}>{trip.date}</td>
                    <td style={bodyStyle}>{trip.bus}</td>
                    <td style={bodyStyle}>{trip.from}</td>
                    <td style={bodyStyle}>{trip.to}</td>
                    <td style={bodyStyle}>{trip.departure}</td>
                    <td style={bodyStyle}>{trip.arrival}</td>
                    <td style={bodyStyle}>{trip.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const historyTable = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#10233f",
  borderRadius: "18px",
  overflow: "hidden",
};

const headerStyle = {
  padding: "16px",
  color: "#94a3b8",
  textAlign: "left",
  background: "#0b1d35",
};

const bodyStyle = {
  padding: "16px",
  borderTop: "1px solid #1f2a44",
  color: "white",
};

export default BusHistory;
