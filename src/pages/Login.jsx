import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#00152b",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>🚌 CampusConnect Transit Pro</h1>

        <h2>Select Role</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button onClick={() => navigate("/parent")}>
            Parent
          </button>

          <button onClick={() => navigate("/driver")}>
            Driver
          </button>

          <button onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;