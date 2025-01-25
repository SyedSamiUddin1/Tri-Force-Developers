// Import necessary dependencies
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the Signup component
function Signup(props) {
  const navigate = useNavigate();
  // Initialize state for user credentials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update credentials state on input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure credentials object
    const { name, email, password, confirmPassword } = credentials;

    // Check for empty fields
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Validate password format (8+ chars, uppercase, lowercase, numbers)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(credentials.password)) {
      props.handleAlert(
        "Password should be at least 8 characters, contain uppercase, lowercase letters, and numbers.",
        "danger"
      );
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
      props.handleAlert("Please enter valid email format.", "danger");
      return;
    }

    // Check password match
    if (credentials.password !== credentials.confirmPassword) {
      props.handleAlert("Password do not match.", "danger");
      return;
    }

    try {
      // Send a POST request to the server to register the user
      const response = await axios.post(
        "http://localhost:8001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // If the response status is 201, display a success message
      if (response.status === 201) {
        props.handleAlert("User registered successfully.", "success");

        // Reset the credentials state
        setCredentials({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      // If there's an error, display an error message
      props.handleAlert({
        type: "danger",
        message: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <AuthCard title="Create your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            label="Full name"
            icon={<User size={20} />}
            placeholder="Enter your full name"
            value={credentials.name}
            onChange={handleChange}
          />

          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            label="Email address"
            icon={<Mail size={20} />}
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
          />

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            label="Password"
            icon={<Lock size={20} />}
            placeholder="Create a password"
            value={credentials.password}
            onChange={handleChange}
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            label="Confirm password"
            icon={<Lock size={20} />}
            placeholder="Confirm your password"
            value={credentials.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button text={"Create account"} />

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
export default Signup;
