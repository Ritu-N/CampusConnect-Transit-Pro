import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ParentDashboard from "./pages/ParentDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TrackBus from "./TrackBus";
import RoutePage from "./RoutePage";
import Students from "./Students";
import Settings from "./Settings";
import Notifications from "./Notifications";
import Profile from "./Profile";
import BusHistory from "./BusHistory";
import Emergency from "./Emergency";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/parent"
          element={<ParentDashboard />}
        />
        <Route
          path="/driver"
          element={<DriverDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
  path="/notifications"
  element={<Notifications />}
/>
<Route
  path="/emergency"
  element={<Emergency />}
/>
        <Route path="/trackbus" element={<TrackBus />} />
<Route path="/route" element={<RoutePage />} />
<Route path="/students" element={<Students />} />
<Route path="/settings" element={<Settings />} />
<Route path="/profile" element={<Profile />} />
<Route path="/history" element={<BusHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;