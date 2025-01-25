import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Cookies from "js-cookie";
import axios from "axios";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get("http://localhost:8001/api/auth/getUser", {
          withCredentials: "include",
        })
        .then((response) => {
          const userData = response.data.user;
          setUsername(userData.name);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleProfileCardToggle = () => {
    setShowProfileCard(!showProfileCard);
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="Authify logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Authify
            </span>
          </div>

          {/* Navbar Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="bg-black rounded-full h-10 w-10 flex items-center justify-center text-white"
                  onClick={handleProfileCardToggle}
                >
                  {username ? username.charAt(0).toUpperCase() : ""}
                </button>
                {showProfileCard && <ProfileCard handleLogout={handleLogout} />}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button text="Sign in" />
                </Link>
                <Link to="/signup">
                  <Button text="Sign up" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
