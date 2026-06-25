/*function Students() {
  return (
    <div>
      <h1>🎓 Students</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Bus No</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Rahul</td>
            <td>10-A</td>
            <td>Bus 1</td>
          </tr>

          <tr>
            <td>Priya</td>
            <td>9-B</td>
            <td>Bus 2</td>
          </tr>

          <tr>
            <td>Arjun</td>
            <td>8-A</td>
            <td>Bus 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Students;*/
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
const th = {
  padding: "15px",
  color: "white",
  textAlign: "center",
};

const td = {
  padding: "15px",
  textAlign: "center",
  borderTop: "1px solid #27496d",
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
            color: "white",
            minHeight: "100vh",
            padding: "30px",
          }}
        >
          <h1>🎓 Students</h1>

         <table
  style={{
    width: "100%",
    marginTop: "25px",
    borderCollapse: "collapse",
    background: "#10233f",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  }}
>
  <thead>
    <tr style={{ background: "#1b3760" }}>
      <th style={th}>ID</th>
      <th style={th}>Student Name</th>
      <th style={th}>Class</th>
      <th style={th}>Bus Number</th>
      <th style={th}>Status</th>
    </tr>
  </thead>

  <tbody>
    {students.map((student) => (
      <tr key={student.id}>
        <td style={td}>{student.id}</td>
        <td style={td}>{student.name}</td>
        <td style={td}>{student.class}</td>
        <td style={td}>{student.bus}</td>
        <td style={{ ...td, color: "#39d353" }}>🟢 Present</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>
    </>
  );
}

export default Students;