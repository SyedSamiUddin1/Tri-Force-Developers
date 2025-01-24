import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Update credentials state on input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!credentials.email || !credentials.password) {
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

    try {
    } catch (error) {}
  };

  return (
    <AuthCard title="Sign in to your account">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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
            autoComplete="current-password"
            label="Password"
            icon={<Lock size={20} />}
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/forgotpassword"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button text={"Sign in"} />

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default Login;
