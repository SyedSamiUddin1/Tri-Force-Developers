import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/common/Alert";

function App() {
  // State to store alert messages
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
