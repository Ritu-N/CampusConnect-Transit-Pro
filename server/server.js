const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running 🚍");
});

// ================= Students =================

app.get("/students", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rahul Kumar",
      class: "X-A",
      bus: "TN09 AB1234",
    },
    {
      id: 2,
      name: "Priya Sharma",
      class: "IX-B",
      bus: "TN09 AB1234",
    },
    {
      id: 3,
      name: "Arjun",
      class: "VIII-A",
      bus: "TN09 AB1234",
    },
  ]);
});

// ================= Parent Profile =================

app.get("/profile", (req, res) => {
  res.json({
    parent: "Mr. Kumar",
    student: "Rahul Kumar",
    class: "X-A",
    bus: "TN09 AB1234",
    phone: "+91 9876543210",
    email: "parent@gmail.com",
  });
});

// ================= Bus Tracking =================

app.get("/trackbus", (req, res) => {
  res.json({
    lat: 13.0839,
    lng: 80.2708,
    stop: "Anna Nagar",
    speed: 42,
    eta: "15 min",
    status: "On Route",
    driver: "Ramesh Kumar",
    bus: "TN09 AB1234",
    updated: new Date().toLocaleTimeString(),
  });
});

// ================= Notifications =================

app.get("/notifications", (req, res) => {
  res.json([
    {
      title: "Bus Started",
      message: "Bus has started from Anna Nagar.",
      time: "8:00 AM",
    },
    {
      title: "Reached Koyambedu",
      message: "Bus reached Koyambedu.",
      time: "8:20 AM",
    },
    {
      title: "ETA Update",
      message: "Bus will reach campus in 15 minutes.",
      time: "8:40 AM",
    },
  ]);
});

// ================= Bus History =================

app.get("/history", (req, res) => {
  res.json([
    {
      date: "25 June 2026",
      bus: "TN09 AB1234",
      from: "Anna Nagar",
      to: "Campus",
      departure: "8:00 AM",
      arrival: "8:55 AM",
      status: "Completed",
    },
    {
      date: "24 June 2026",
      bus: "TN09 AB1234",
      from: "Anna Nagar",
      to: "Campus",
      departure: "8:05 AM",
      arrival: "9:00 AM",
      status: "Completed",
    },
  ]);
});

// ================= Emergency =================

app.get("/emergency", (req, res) => {
  res.json({
    driver: {
      name: "Ramesh Kumar",
      phone: "+91 9876543210",
    },
    office: {
      phone: "+91 9123456789",
    },
    emergency: {
      police: "100",
      ambulance: "108",
    },
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});