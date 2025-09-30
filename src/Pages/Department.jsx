import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const AddDepartment = () => {
  const [formData, setFormData] = useState({ dept_name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.dept_name) newErrors.dept_name = "Department name is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://employee-react.onrender.com//emp/register/add-department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Department added successfully!");
        setFormData({ dept_name: "", description: "" });
        setErrors({});
        Navigate('/ListDept')
      } else if (res.status === 401) {
        setMessage("❌ Unauthorized! Please login again.");
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("❌ Server error, please try later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-black">
      <motion.div
        className="card shadow-lg p-4 bg-white text-dark"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "20px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4" style={{ color: "orange" }}>
          🏢 Add Department
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Department Name</label>
            <input
              type="text"
              className={`form-control ${errors.dept_name ? "is-invalid" : ""}`}
              placeholder="Enter department name"
              value={formData.dept_name}
              onChange={(e) =>
                setFormData({ ...formData, dept_name: e.target.value })
              }
            />
            {errors.dept_name && (
              <div className="invalid-feedback">{errors.dept_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Enter description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "orange",
              color: "white",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
          >
            Add Department
          </motion.button>
        </form>

        {message && (
          <motion.div
            className="mt-3 text-center fw-bold"
            style={{ color: message.includes("success") ? "green" : "red" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AddDepartment;