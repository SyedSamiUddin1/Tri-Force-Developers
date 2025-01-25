import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone } from "lucide-react";
import axios from "axios";
import AuthCard from "./common/AuthCard";
import Button from "./Button";
import Cookies from "js-cookie";

export default function QRCodeSetup(props) {
  const navigate = useNavigate();
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const setup2FA = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8001/api/auth/setup2FA",
          {
            token,
          },
          {
            withCredentials: true,
          }
        );

        console.log("QR Code Response:", response.data);

        if (response.data.qrCode) {
          setQrCodeData(response.data.qrCode);
        } else {
          setError("Failed to generate QR code");
        }
      } catch (error) {
        console.error("2FA setup error:", error);
        setError(error.response?.data?.message || "Failed to set up 2FA");
      } finally {
        setLoading(false);
      }
    };

    setup2FA();
  }, [token, navigate]);

  const handleVerifyClick = () => {
    navigate("/verifyOTP");
  };

  if (loading) {
    return (
      <AuthCard title="Setting up Two-Factor Authentication">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AuthCard>
    );
  }

  if (error) {
    return (
      <AuthCard title="Setup Error">
        <div className="text-center text-red-600 p-4">
          <p>{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set up Two-Factor Authentication">
      <div className="mt-2 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Smartphone className="h-12 w-12 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            Scan this QR code with your authenticator app to enable two-factor
            authentication
          </p>
        </div>

        {qrCodeData && (
          <div className="flex justify-center p-4">
            <div className="bg-white p-4 rounded-xl shadow-md border-2 border-indigo-100">
              <img src={qrCodeData} alt="QR Code" className="w-48 h-48" />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-900">
              Setup Instructions:
            </h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>
                Download an authenticator app like Google Authenticator or Authy
              </li>
              <li>Open your authenticator app</li>
              <li>Tap the + or "Add" button</li>
              <li>Scan the QR code shown above</li>
              <li>Enter the 6-digit code shown in your app</li>
            </ol>
          </div>

          <Button text="Enter verification code" onClick={handleVerifyClick} />
        </div>
      </div>
    </AuthCard>
  );
}
