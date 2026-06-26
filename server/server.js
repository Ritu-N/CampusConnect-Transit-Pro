const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const students = [
  { id: 1, name: "Rahul Kumar", class: "X-A", bus: "TN09 AB1234", status: "Present" },
  { id: 2, name: "Priya Sharma", class: "IX-B", bus: "TN09 AB1234", status: "Present" },
  { id: 3, name: "Arjun", class: "VIII-A", bus: "TN09 AB1234", status: "Absent" },
];

const drivers = [
  { id: 1, name: "Ramesh Kumar", phone: "+91 9876543210", status: "On Route", assignedBusId: 1 },
  { id: 2, name: "Sakshi Patel", phone: "+91 9123456781", status: "Available", assignedBusId: 2 },
  { id: 3, name: "Ajay Singh", phone: "+91 9012345678", status: "Available", assignedBusId: 3 },
];

const routes = [
  {
    id: 1,
    name: "Anna Nagar - Campus",
    stops: ["Anna Nagar", "Koyambedu", "Vadapalani", "Guindy", "Campus"],
    assignedBusId: 1,
  },
  {
    id: 2,
    name: "Adyar - Campus",
    stops: ["Adyar", "Tidel Park", "Velachery", "Guindy", "Campus"],
    assignedBusId: 2,
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
  { id: 1, title: "Bus Started", message: "Bus TN09 AB1234 has left Anna Nagar.", time: "8:00 AM" },
  { id: 2, title: "Reached Koyambedu", message: "Bus TN09 AB1234 has reached Koyambedu.", time: "8:20 AM" },
  { id: 3, title: "ETA Update", message: "Bus will reach campus in 12 minutes.", time: "8:40 AM" },
];

const history = [
  {
    id: 1,
    date: "25 June 2026",
    bus: "TN09 AB1234",
    from: "Anna Nagar",
    to: "Campus",
    departure: "8:00 AM",
    arrival: "8:55 AM",
    status: "Completed",
  },
  {
    id: 2,
    date: "24 June 2026",
    bus: "TN09 AB1234",
    from: "Anna Nagar",
    to: "Campus",
    departure: "8:05 AM",
    arrival: "9:00 AM",
    status: "Completed",
  },
];

let profile = {
  parent: "Mr. Kumar",
  student: "Rahul Kumar",
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

const getBusById = (id) => buses.find((bus) => bus.id === id);
const getDriverById = (id) => drivers.find((driver) => driver.id === id);
const getRouteById = (id) => routes.find((route) => route.id === id);

const randomLocation = (location) => {
  return [location[0] + (Math.random() - 0.5) * 0.0015, location[1] + (Math.random() - 0.5) * 0.0015];
};

app.get("/", (req, res) => {
  res.send("CampusConnect Backend Running 🚍");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name, class: studentClass, bus } = req.body;
  if (!name || !studentClass || !bus) {
    return res.status(400).json({ error: "Name, class and bus are required" });
  }

  const newStudent = {
    id: nextId(students),
    name,
    class: studentClass,
    bus,
    status: "Present",
  };

  students.push(newStudent);
  res.json(newStudent);
});

app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const { name, class: studentClass, bus, status } = req.body;
  if (name !== undefined) student.name = name;
  if (studentClass !== undefined) student.class = studentClass;
  if (bus !== undefined) student.bus = bus;
  if (status !== undefined) student.status = status;
  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

app.get("/drivers", (req, res) => {
  res.json(drivers.map((driver) => ({
    ...driver,
    busNumber: getBusById(driver.assignedBusId)?.number || "Unassigned",
  })));
});

app.post("/drivers", (req, res) => {
  const { name, phone, assignedBusId } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }
  const newDriver = {
    id: nextId(drivers),
    name,
    phone,
    status: assignedBusId ? "Assigned" : "Available",
    assignedBusId: assignedBusId || null,
  };
  drivers.push(newDriver);
  res.json(newDriver);
});

app.put("/drivers/:id", (req, res) => {
  const id = Number(req.params.id);
  const driver = drivers.find((item) => item.id === id);
  if (!driver) {
    return res.status(404).json({ error: "Driver not found" });
  }
  const { name, phone, status, assignedBusId } = req.body;
  if (name !== undefined) driver.name = name;
  if (phone !== undefined) driver.phone = phone;
  if (status !== undefined) driver.status = status;
  if (assignedBusId !== undefined) driver.assignedBusId = assignedBusId;
  res.json(driver);
});

app.delete("/drivers/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = drivers.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Driver not found" });
  }
  drivers.splice(index, 1);
  res.json({ message: "Driver removed" });
});

app.get("/buses", (req, res) => {
  res.json(buses.map((bus) => ({
    ...bus,
    driverName: getDriverById(bus.driverId)?.name || "Unassigned",
    routeName: getRouteById(bus.routeId)?.name || "Unassigned",
  })));
});

app.post("/buses", (req, res) => {
  const { number, capacity, driverId, routeId } = req.body;
  if (!number || !capacity) {
    return res.status(400).json({ error: "Bus number and capacity are required" });
  }
  const newBus = {
    id: nextId(buses),
    number,
    capacity,
    driverId: driverId || null,
    routeId: routeId || null,
    status: driverId ? "Assigned" : "Available",
    location: [13.0827, 80.2707],
    speed: "0 km/h",
  };
  buses.push(newBus);
  res.json(newBus);
});

app.put("/buses/:id", (req, res) => {
  const id = Number(req.params.id);
  const bus = getBusById(id);
  if (!bus) {
    return res.status(404).json({ error: "Bus not found" });
  }
  const { number, capacity, driverId, routeId, status, location } = req.body;
  if (number !== undefined) bus.number = number;
  if (capacity !== undefined) bus.capacity = capacity;
  if (driverId !== undefined) bus.driverId = driverId;
  if (routeId !== undefined) bus.routeId = routeId;
  if (status !== undefined) bus.status = status;
  if (location !== undefined) bus.location = location;
  res.json(bus);
});

app.delete("/buses/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = buses.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Bus not found" });
  }
  buses.splice(index, 1);
  res.json({ message: "Bus removed" });
});

app.get("/routes", (req, res) => {
  res.json(routes.map((route) => ({
    ...route,
    assignedBusNumber: getBusById(route.assignedBusId)?.number || "Unassigned",
  })));
});

app.post("/routes", (req, res) => {
  const { name, stops, assignedBusId } = req.body;
  if (!name || !Array.isArray(stops)) {
    return res.status(400).json({ error: "Route name and stops are required" });
  }
  const newRoute = {
    id: nextId(routes),
    name,
    stops,
    assignedBusId: assignedBusId || null,
  };
  routes.push(newRoute);
  res.json(newRoute);
});

app.put("/routes/:id", (req, res) => {
  const id = Number(req.params.id);
  const route = getRouteById(id);
  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }
  const { assignedBusId, stops, name } = req.body;
  if (assignedBusId !== undefined) route.assignedBusId = assignedBusId;
  if (stops !== undefined) route.stops = stops;
  if (name !== undefined) route.name = name;
  res.json(route);
});

app.get("/dashboard/parent", (req, res) => {
  const activeBus = buses.find((bus) => bus.status === "On Route") || buses[0];
  res.json({
    activeBuses: buses.filter((bus) => bus.status === "On Route").length,
    drivers: drivers.length,
    students: students.length,
    currentBus: {
      busNumber: activeBus.number,
      status: activeBus.status,
      driver: getDriverById(activeBus.driverId)?.name || "Unassigned",
      eta: "12 min",
      speed: activeBus.speed,
      location: activeBus.location,
      route: getRouteById(activeBus.routeId)?.name || "Unassigned",
    },
  });
});

app.get("/dashboard/admin", (req, res) => {
  res.json({
    totalStudents: students.length,
    totalDrivers: drivers.length,
    totalBuses: buses.length,
    activeRoutes: routes.length,
    recentNotifications: notifications.slice(-4).reverse(),
  });
});

app.get("/dashboard/driver", (req, res) => {
  const driverId = Number(req.query.driverId) || 1;
  const driver = getDriverById(driverId) || drivers[0];
  const bus = getBusById(driver.assignedBusId);
  const route = bus ? getRouteById(bus.routeId) : null;

  res.json({
    driver,
    bus: bus
      ? {
          id: bus.id,
          number: bus.number,
          status: bus.status,
          speed: bus.speed,
          routeId: bus.routeId,
          routeName: route?.name || "Unassigned",
          location: bus.location,
        }
      : null,
    route,
    nextStop: route?.stops[1] || "N/A",
    currentStop: route?.stops[0] || "N/A",
  });
});

app.get("/trackbus", (req, res) => {
  const trackBus = buses.find((bus) => bus.status === "On Route") || buses[0];
  trackBus.location = randomLocation(trackBus.location);
  const route = getRouteById(trackBus.routeId);
  const nextStopIndex = route ? Math.min(route.stops.length - 1, Math.floor(Date.now() / 10000) % route.stops.length) : 0;
  const currentStop = route?.stops[nextStopIndex] || "Unknown";
  const busDriver = getDriverById(trackBus.driverId);
  res.json({
    currentStop,
    eta: "12 min",
    speed: trackBus.speed,
    status: trackBus.status,
    driver: busDriver?.name || "Unknown",
    busNumber: trackBus.number,
    lastUpdated: new Date().toLocaleTimeString(),
    location: trackBus.location,
  });
});

app.get("/notifications", (req, res) => {
  res.json(notifications.slice().reverse());
});

app.post("/notifications", (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Title and message are required" });
  }
  const newNotification = {
    id: nextId(notifications),
    title,
    message,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  notifications.push(newNotification);
  res.json(newNotification);
});

app.get("/history", (req, res) => {
  res.json(history.slice().reverse());
});

app.post("/history", (req, res) => {
  const { date, bus, from, to, departure, arrival, status } = req.body;
  if (!date || !bus || !from || !to) {
    return res.status(400).json({ error: "History record requires date, bus, from, and to" });
  }
  const newEvent = { id: nextId(history), date, bus, from, to, departure, arrival, status: status || "Completed" };
  history.push(newEvent);
  res.json(newEvent);
});

app.get("/emergency", (req, res) => {
  const bus = buses.find((item) => item.status === "On Route") || buses[0];
  const driver = getDriverById(bus.driverId);
  res.json({
    driver: {
      name: driver?.name || "Ramesh Kumar",
      phone: driver?.phone || "+91 9876543210",
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

app.get("/profile", (req, res) => {
  res.json(profile);
});

app.put("/profile", (req, res) => {
  const { parent, student, class: className, bus: busNumber, phone, email } = req.body;
  if (parent !== undefined) profile.parent = parent;
  if (student !== undefined) profile.student = student;
  if (className !== undefined) profile.class = className;
  if (busNumber !== undefined) profile.bus = busNumber;
  if (phone !== undefined) profile.phone = phone;
  if (email !== undefined) profile.email = email;
  res.json(profile);
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