import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;

        try {
            const res = await fetch("https://employee-react.onrender.com/emp/register", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (user) {
                setMessage(`Login successful! Welcome ${user.name}`);
                localStorage.setItem("user", JSON.stringify(user));
                setFormData({ email: "", password: "" });
                setErrors({});
                setTimeout(() => navigate("/Department"), 1000);
            } else {
                setMessage("Invalid email or password");
            }
        } catch (error) {
            setMessage("Server error, please try later.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-black">
            <motion.div
                className="card shadow-lg p-4 bg-white text-dark"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-center mb-4" style={{ color: "orange" }}>
                    🔑 Login
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            <FaEnvelope className="me-2 text-orange" /> Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">
                            <FaLock className="me-2 text-orange" /> Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    <div className="text-center mt-3">
                        <p>
                            Not registered?{" "}
                            <Link to="/" className="text-orange fw-bold">
                                Register
                            </Link>
                        </p>
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
                        Login
                    </motion.button>
                </form>

                {message && (
                    <motion.div
                        className="mt-3 text-center fw-bold"
                        style={{
                            color: message.includes("successful") ? "green" : "red",
                        }}
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

export default Login;
