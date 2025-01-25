import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthCard from "./common/AuthCard";
import Button from "./Button";

export default function VerifyOTP(props) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useMemo(
    () =>
      Array(6)
        .fill()
        .map(() => React.createRef()),
    []
  );

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = otp.join("");

    if (token.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8001/api/auth/verify2FA",
        {
          token,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "2FA enabled successfully") {
        props.handleAlert("2FA Enabled successfully.", "success");
        // Redirect to home
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
      props.handleAlert("Verification failed.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Enter verification code">
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Enter the 6-digit code from your authenticator app
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
              disabled={loading}
            />
          ))}
        </div>

        {/* {error && <p className="text-sm text-center text-red-600">{error}</p>} */}

        <Button
          text={loading ? "Verifying..." : "Verify Code"}
          disabled={loading}
        />

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              onClick={() => navigate("/qr-setup")}
            >
              Go back to QR code
            </button>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}
