import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Notifications() {
  const notifications = [
    {
      title: "🚌 Bus Started",
      message: "Bus 1 has started from Anna Nagar.",
      time: "8:00 AM",
    },
    {
      title: "📍 Bus Reached",
      message: "Bus reached Koyambedu.",
      time: "8:20 AM",
    },
    {
      title: "⏱ ETA Update",
      message: "Bus will reach campus in 15 minutes.",
      time: "8:40 AM",
    },
    {
      title: "🏫 Arrived",
      message: "Bus has reached Campus.",
      time: "9:00 AM",
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
          <h1>🔔 Notifications</h1>

          {notifications.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#10233f",
                marginTop: "20px",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <small>{item.time}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notifications;