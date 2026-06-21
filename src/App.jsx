import { useState } from "react"

import ParentDashboard from "./ParentDashboard"
import DriverDashboard from "./DriverDashboard"
import AdminDashboard from "./AdminDashboard"

function App() {
  const [page, setPage] = useState("parent")

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#07101f",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>CampusConnect Transit Pro</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("parent")}>
          Parent
        </button>

        <button onClick={() => setPage("driver")}>
          Driver
        </button>

        <button onClick={() => setPage("admin")}>
          Admin
        </button>
      </div>

      {page === "parent" && <ParentDashboard />}
      {page === "driver" && <DriverDashboard />}
      {page === "admin" && <AdminDashboard />}
    </div>
  )
}

export default App