import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function BusHistory() {
  const trips = [
    {
      date: "25 June 2026",
      bus: "TN09 AB1234",
      start: "Anna Nagar",
      end: "Campus",
      departure: "8:00 AM",
      arrival: "8:55 AM",
      status: "Completed",
    },
    {
      date: "24 June 2026",
      bus: "TN09 AB1234",
      start: "Anna Nagar",
      end: "Campus",
      departure: "8:05 AM",
      arrival: "9:00 AM",
      status: "Completed",
    },
    {
      date: "23 June 2026",
      bus: "TN09 AB1234",
      start: "Anna Nagar",
      end: "Campus",
      departure: "8:10 AM",
      arrival: "9:05 AM",
      status: "Completed",
    },
  ];

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
          <h1>📜 Bus History</h1>

          <table
            style={{
              width: "100%",
              marginTop: "30px",
              borderCollapse: "collapse",
              background: "#10233f",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                <th style={th}>Date</th>
                <th style={th}>Bus</th>
                <th style={th}>From</th>
                <th style={th}>To</th>
                <th style={th}>Departure</th>
                <th style={th}>Arrival</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((trip, index) => (
                <tr key={index}>
                  <td style={td}>{trip.date}</td>
                  <td style={td}>{trip.bus}</td>
                  <td style={td}>{trip.start}</td>
                  <td style={td}>{trip.end}</td>
                  <td style={td}>{trip.departure}</td>
                  <td style={td}>{trip.arrival}</td>
                  <td style={td}>{trip.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const th = {
  padding: "15px",
  background: "#0b1d35",
  color: "white",
};

const td = {
  padding: "15px",
  borderTop: "1px solid #29466e",
  textAlign: "center",
};

export default BusHistory;