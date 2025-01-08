import React from "react";
import { Mail, Lock } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import { Link } from "react-router-dom";

function Login(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    props.handleAlert("Working", "success");
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
            required
            label="Email address"
            icon={<Mail size={20} />}
            placeholder="Enter your email"
          />

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            label="Password"
            icon={<Lock size={20} />}
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="#"
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
