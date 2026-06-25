import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
function Profile() {

    const [profile, setProfile] = useState(null);

useEffect(() => {
  axios
    .get("http://localhost:5000/profile")
    .then((res) => setProfile(res.data))
    .catch((err) => console.log(err));
}, []);
  const card = {
    background: "#10233f",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "auto",
    marginTop: "30px",
    textAlign: "left",
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            background: "#15161d",
            minHeight: "100vh",
            color: "white",
            padding: "30px",
          }}
        >
          <h1>👤 Parent Profile</h1>

          <div style={card}>
  {!profile ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h2>Ritu</h2>

      <hr />

      <p><b>Parent Name:</b> {profile.parent}</p>

      <p><b>Student:</b> {profile.student}</p>

      <p><b>Class:</b> {profile.class}</p>

      <p><b>Bus Number:</b> {profile.bus}</p>

      <p><b>Phone:</b> {profile.phone}</p>

      <p><b>Email:</b> {profile.email}</p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          background: "#1e90ff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Edit Profile
      </button>
    </>
  )}
</div>
        </div>
      </div>
    </>
  );
}

export default Profile;