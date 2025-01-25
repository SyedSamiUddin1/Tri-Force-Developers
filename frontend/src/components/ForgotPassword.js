import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Input from "./common/Input";
import Button from "./Button";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <AuthCard title="Reset your password">
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>
      </div>

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
        </div>

        <Button text={"Forgot password"} />

        <div className="text-center text-sm">
          <Link
            to="/login"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default ForgotPassword;
