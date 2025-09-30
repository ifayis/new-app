import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ListDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("❌ Unauthorized! Please login.");
          return;
        }

        const res = await fetch("https://employee-react.onrender.com//emp/departments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (res.status === 401) {
          setMessage("❌ Unauthorized! Please login again.");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch departments");
        }

        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        setMessage("❌ Server error, please try later.");
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="container py-5 bg-black min-vh-100">
      <motion.div
        className="card shadow-lg p-4 bg-white text-dark mx-auto"
        style={{ maxWidth: "800px", borderRadius: "20px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4" style={{ color: "orange" }}>
          📋 Departments
        </h2>

        {message && (
          <motion.div
            className="text-center mb-3 fw-bold"
            style={{ color: "red" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}

        {departments.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead style={{ backgroundColor: "orange", color: "white" }}>
                <tr>
                  <th>#</th>
                  <th>Department Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={dept.id || index}>
                    <td>{index + 1}</td>
                    <td>{dept.dept_name}</td>
                    <td>{dept.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !message && (
            <div className="text-center fw-bold" style={{ color: "orange" }}>
              No departments found.
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default ListDepartments;
