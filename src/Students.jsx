import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [bus, setBus] = useState("");

  const loadStudents = () => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = () => {
    if (!name || !studentClass || !bus) {
      alert("Please fill all fields");
      return;
    }

    axios
      .post("http://localhost:5000/students", {
        name,
        class: studentClass,
        bus,
      })
      .then(() => {
        loadStudents();
        setName("");
        setStudentClass("");
        setBus("");
      })
      .catch((err) => console.log(err));
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        loadStudents();
      })
      .catch((err) => console.log(err));
  };

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
          <h1>🎓 Students Management</h1>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              marginBottom: "25px",
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "220px",
              }}
            />

            <input
              placeholder="Class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "120px",
              }}
            />

            <input
              placeholder="Bus Number"
              value={bus}
              onChange={(e) => setBus(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                width: "180px",
              }}
            />

            <button
              onClick={addStudent}
              style={{
                background: "#00b894",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ➕ Add Student
            </button>
          </div>

          <table
            style={{
              width: "100%",
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
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={td}>{student.id}</td>
                  <td style={td}>{student.name}</td>
                  <td style={td}>{student.class}</td>
                  <td style={td}>{student.bus}</td>
                  <td style={{ ...td, color: "#39d353" }}>
                    🟢 Present
                  </td>

                  <td style={td}>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      style={{
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 15px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
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