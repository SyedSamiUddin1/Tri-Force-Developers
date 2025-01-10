import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import AuthCard from "./common/AuthCard";
import Button from "./Button";
import { Link } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification here
  };

  return (
    <AuthCard title="Enter verification code">
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          We've sent a 6-digit verification code to your email address. Please
          enter the code below.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          ))}
        </div>

        <Button text={"Verify Code"} />

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Resend
            </button>
          </p>
          <Link
            to="/forgotpassword"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to reset password
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default VerifyOTP;
