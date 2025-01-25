import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = ({ handleLogout }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/auth/getUser", {
        withCredentials: "include",
      })
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className="bg-white shadow-lg rounded-lg py-4 px-0 w-52 md:w-60 absolute right-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-24 bg-indigo-600 mx-auto justify-center items-center text-center">
          <button className="mx-auto my-6 bg-black rounded-full h-10 w-10 flex items-center justify-center text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </button>
        </div>
        <div className="flex flex-col gap-2 w-[90%]">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 text-center">
            {user.name ? user.name : ""}
          </h2>
          <p className="text-gray-600 text-sm text-center">
            {user.email ? user.email : ""}
          </p>
          <div className="flex flex-col items-start text-sm">
            <a
              href="/qr-setup"
              className="text-black hover:bg-indigo-600 hover:rounded-md p-2 hover:text-white w-full my-1"
            >
              2FA Setup
            </a>
            <button
              onClick={handleLogout}
              className="text-black hover:bg-indigo-600 hover:rounded-md p-2 hover:text-white w-full my-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
