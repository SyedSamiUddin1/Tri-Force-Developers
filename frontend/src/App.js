import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/common/Alert";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import NewPassword from "./components/NewPassword";
import QRCodeSetup from "./components/QRCodeSetup";

function App() {
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <BrowserRouter>
      {alert && <Alert alert={alert} />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Navbar />
              <Hero />
              <Features />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login handleAlert={handleAlert} />} />
        <Route path="/signup" element={<Signup handleAlert={handleAlert} />} />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword handleAlert={handleAlert} />}
        />
        <Route
          path="/verifyOTP"
          element={<VerifyOTP handleAlert={handleAlert} />}
        />
        <Route
          path="/newpassword"
          element={<NewPassword handleAlert={handleAlert} />}
        />
        <Route
          path="/qr-setup"
          element={<QRCodeSetup handleAlert={handleAlert} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
