import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import axios from "axios";
import Cookies from "js-cookie";

function Login(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    tokenOtp: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      // if (credentials.token !== 6) {
      //   props.handleAlert("Please enter 6 digit OTP Code.", "danger");
      //   return;
      // }

      const response = await axios.post(
        "http://localhost:8001/api/auth/login",
        credentials
      );

      // Store token in cookies
      Cookies.set("token", response.data.token, {
        secure: true,
        sameSite: "strict",
      });

      // Redirect to main page
      navigate("/");
      props.handleAlert("Successfully logged in.", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      props.handleAlert(errorMessage, "danger");
    }
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
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />

          <Input
            id="tokenOtp"
            name="tokenOtp"
            type="text"
            autoComplete="tokenOtp"
            label="OTP Token"
            placeholder="Enter your OTP Token"
            value={credentials.tokenOtp}
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

        <Button text="Sign in" />

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </div>
      </form>
    </AuthCard>
  );
}

export default Login;
