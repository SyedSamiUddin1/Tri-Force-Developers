import React from "react";
import { Mail, Lock, User } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import { Link } from "react-router-dom";

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
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
            required
            label="Full name"
            icon={<User size={20} />}
            placeholder="Enter your full name"
          />

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
            autoComplete="new-password"
            required
            label="Password"
            icon={<Lock size={20} />}
            placeholder="Create a password"
          />

          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            label="Confirm password"
            icon={<Lock size={20} />}
            placeholder="Confirm your password"
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
