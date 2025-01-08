import React from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Authify logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Authify
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/login">
              <Button text={"Sign in"} />
            </Link>
            <Link to="/signup">
              <Button text={"Sign up"} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
