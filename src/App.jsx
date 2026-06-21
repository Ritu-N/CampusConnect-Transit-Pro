import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ParentDashboard from "./pages/ParentDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;