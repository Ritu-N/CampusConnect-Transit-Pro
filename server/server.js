const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const students = [
  { id: 1, name: "Rahul Kumar", class: "X-A", rollNumber: "12", bus: "TN09 AB1234", status: "Present" },
  { id: 2, name: "Priya Sharma", class: "IX-B", rollNumber: "27", bus: "TN09 AB1234", status: "Present" },
  { id: 3, name: "Arjun", class: "VIII-A", rollNumber: "05", bus: "TN09 AB1234", status: "Absent" },
];

const drivers = [
  { id: 1, name: "Ramesh Kumar", phone: "+91 9876543210", status: "On Route", assignedBusId: 1 },
  { id: 2, name: "Sakshi Patel", phone: "+91 9123456781", status: "Available", assignedBusId: 2 },
  { id: 3, name: "Ajay Singh", phone: "+91 9012345678", status: "Available", assignedBusId: 3 },
];

const routes = [
  {
    id: 1,
    name: "Anna Nagar - CampusConnect",
    stops: ["Anna Nagar", "Koyambedu", "Vadapalani", "Guindy", "CampusConnect"],
    stopLocations: [
      [13.0838, 80.2719],
      [13.0850, 80.2735],
      [13.0862, 80.2750],
      [13.0875, 80.2768],
      [13.0893, 80.2785],
    ],
    assignedBusId: 1,
    departureTime: "8:00 AM",
    expectedArrival: "8:55 AM",
  },
  {
    id: 2,
    name: "Adyar - CampusConnect",
    stops: ["Adyar", "Tidel Park", "Velachery", "Guindy", "CampusConnect"],
    stopLocations: [
      [13.0110, 80.2560],
      [13.0215, 80.2588],
      [13.0263, 80.2602],
      [13.0370, 80.2628],
      [13.0893, 80.2785],
    ],
    assignedBusId: 2,
    departureTime: "8:15 AM",
    expectedArrival: "9:05 AM",
  },
];

const buses = [
  {
    id: 1,
    number: "TN09 AB1234",
    capacity: 40,
    driverId: 1,
    routeId: 1,
    status: "On Route",
    location: [13.0838, 80.2719],
    speed: "42 km/h",
  },
  {
    id: 2,
    number: "TN09 XY5678",
    capacity: 38,
    driverId: 2,
    routeId: 2,
    status: "Idle",
    location: [13.0190, 80.2210],
    speed: "0 km/h",
  },
  {
    id: 3,
    number: "TN09 LM9012",
    capacity: 35,
    driverId: 3,
    routeId: null,
    status: "Available",
    location: [13.0620, 80.2530],
    speed: "0 km/h",
  },
];

const notifications = [
  { id: 1, title: "Bus Started", message: "Bus TN09 AB1234 has left Anna Nagar.", time: "8:00 AM", busNumber: "TN09 AB1234" },
  { id: 2, title: "Student Boarded Bus", message: "Rahul Kumar boarded the bus at Anna Nagar.", time: "8:10 AM", busNumber: "TN09 AB1234", studentName: "Rahul Kumar" },
  { id: 3, title: "Bus Reached Stop", message: "Bus reached Koyambedu on schedule.", time: "8:20 AM", busNumber: "TN09 AB1234" },
  { id: 4, title: "Student Reached School", message: "Rahul Kumar has arrived on campus safely.", time: "8:55 AM", busNumber: "TN09 AB1234", studentName: "Rahul Kumar" },
  { id: 5, title: "Bus Delayed", message: "Bus TN09 AB1234 is delayed by 5 minutes.", time: "9:02 AM", busNumber: "TN09 AB1234" },
];

const history = [
  {
    id: 1,
    date: "25 June 2026",
    bus: "TN09 AB1234",
    studentName: "Rahul Kumar",
    from: "Anna Nagar",
    to: "CampusConnect",
    departure: "8:00 AM",
    arrival: "8:55 AM",
    status: "Completed",
  },
  {
    id: 2,
    date: "24 June 2026",
    bus: "TN09 AB1234",
    studentName: "Rahul Kumar",
    from: "Anna Nagar",
    to: "CampusConnect",
    departure: "8:05 AM",
    arrival: "9:00 AM",
    status: "Completed",
  },
];

const schoolLocation = [13.0893, 80.2785];

let profile = {
  parent: "Mr. Kumar",
  student: "Rahul Kumar",
  studentId: 1,
  class: "X-A",
  bus: "TN09 AB1234",
  phone: "+91 9876543210",
  email: "parent@gmail.com",
};

let settings = {
  theme: "dark",
  notificationsEnabled: true,
  autoRouteUpdates: true,
};

const nextId = (collection) => {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
};

const getStudentById = (id) => students.find((student) => student.id === id);
const getStudentByName = (name) => students.find((student) => student.name === name);
const getDriverById = (id) => drivers.find((driver) => driver.id === id);
const getRouteById = (id) => routes.find((route) => route.id === id);
const getBusByNumber = (number) => buses.find((bus) => bus.number === number);

const randomLocation = (location) => {
  return [location[0] + (Math.random() - 0.5) * 0.0012, location[1] + (Math.random() - 0.5) * 0.0012];
};

const getParentContext = () => {
  const student = profile.studentId ? getStudentById(profile.studentId) : getStudentByName(profile.student);
  const bus = getBusByNumber(student?.bus || profile.bus);
  const driver = bus ? getDriverById(bus.driverId) : null;
  const route = bus ? getRouteById(bus.routeId) : null;
  const stopCount = route?.stops?.length || 0;
  const currentIndex = stopCount ? Math.min(stopCount - 1, Math.floor(Date.now() / 15000) % stopCount) : 0;
  const nextIndex = route ? Math.min(stopCount - 1, currentIndex + 1) : 0;

  return {
    student,
    bus,
    driver,
    route,
    currentStopIndex: currentIndex,
    nextStopIndex: nextIndex,
  };
};

const childNotificationFilter = (student, bus) => {
  return notifications.filter((item) => {
    if (item.busNumber && bus && item.busNumber === bus.number) return true;
    if (item.studentName && student && item.studentName === student.name) return true;
    return false;
  });
};

const childHistoryFilter = (student, bus) => {
  return history.filter((item) => {
    if (item.bus && bus && item.bus === bus.number) return true;
    if (item.studentName && student && item.studentName === student.name) return true;
    return false;
  });
};

const buildParentDashboard = () => {
  const { student, bus, driver, route, currentStopIndex, nextStopIndex } = getParentContext();
  const currentStop = route?.stops?.[currentStopIndex] || "Unknown";
  const nextStop = route?.stops?.[nextStopIndex] || "Unknown";
  const tripStatus = bus?.status === "On Route" ? "En Route" : bus?.status || "Pending";
  const eta = route ? `${Math.max(5, 18 - currentStopIndex * 3)} min` : "TBD";
  const trackLocation = bus?.location || schoolLocation;

  return {
    student: {
      name: student?.name || profile.student,
      class: student?.class || profile.class,
      rollNumber: student?.rollNumber || "N/A",
      assignedBusNumber: bus?.number || profile.bus,
    },
    driver: {
      name: driver?.name || "Unassigned",
      phone: driver?.phone || "N/A",
    },
    bus: {
      number: bus?.number || "N/A",
      status: bus?.status || "N/A",
      speed: bus?.speed || "N/A",
      eta,
      currentStop,
      nextStop,
      routeName: route?.name || "Unassigned",
      departureTime: route?.departureTime || "8:00 AM",
      expectedArrival: route?.expectedArrival || "N/A",
      tripStatus,
      lastUpdated: new Date().toLocaleTimeString(),
      location: trackLocation,
      routePolyline: route?.stopLocations || [],
      stopLocations: route?.stopLocations || [],
      schoolLocation,
    },
    notifications: childNotificationFilter(student, bus).slice(-4).reverse(),
    history: childHistoryFilter(student, bus).slice(-4).reverse(),
  };
};

app.get("/dashboard/parent", (req, res) => {
  res.json(buildParentDashboard());
});

app.get("/profile", (req, res) => {
  const student = profile.studentId ? getStudentById(profile.studentId) : getStudentByName(profile.student);
  res.json({
    ...profile,
    rollNumber: student?.rollNumber || "N/A",
    student: student?.name || profile.student,
    class: student?.class || profile.class,
    bus: student?.bus || profile.bus,
  });
});

app.get("/trackbus", (req, res) => {
  const { bus } = getParentContext();
  if (!bus) {
    return res.status(404).json({ error: "Parent bus not found" });
  }
  bus.location = randomLocation(bus.location);
  const route = getRouteById(bus.routeId);
  const stopCount = route?.stops?.length || 0;
  const currentIndex = stopCount ? Math.min(stopCount - 1, Math.floor(Date.now() / 15000) % stopCount) : 0;
  const nextIndex = route ? Math.min(stopCount - 1, currentIndex + 1) : 0;
  const currentStop = route?.stops?.[currentIndex] || "Unknown";
  const nextStop = route?.stops?.[nextIndex] || "Unknown";
  const driver = getDriverById(bus.driverId);

  res.json({
    busNumber: bus.number,
    status: bus.status,
    speed: bus.speed,
    driver: driver?.name || "Unknown",
    eta: route ? `${Math.max(5, 18 - currentIndex * 3)} min` : "TBD",
    currentStop,
    nextStop,
    location: bus.location,
    routeName: route?.name || "Unassigned",
    stopLocations: route?.stopLocations || [],
    schoolLocation,
    lastUpdated: new Date().toLocaleTimeString(),
    popup: {
      busNumber: bus.number,
      driver: driver?.name || "Unknown",
      speed: bus.speed,
      eta: route ? `${Math.max(5, 18 - currentIndex * 3)} min` : "TBD",
      status: bus.status,
    },
  });
});

app.get("/notifications", (req, res) => {
  const { student, bus } = getParentContext();
  res.json(childNotificationFilter(student, bus).slice().reverse());
});

app.get("/history", (req, res) => {
  const { student, bus } = getParentContext();
  res.json(childHistoryFilter(student, bus).slice().reverse());
});

app.get("/settings", (req, res) => {
  res.json(settings);
});

app.put("/settings", (req, res) => {
  const { theme, notificationsEnabled, autoRouteUpdates } = req.body;
  if (theme !== undefined) settings.theme = theme;
  if (notificationsEnabled !== undefined) settings.notificationsEnabled = notificationsEnabled;
  if (autoRouteUpdates !== undefined) settings.autoRouteUpdates = autoRouteUpdates;
  res.json(settings);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
