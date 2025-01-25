import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMessage);
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
