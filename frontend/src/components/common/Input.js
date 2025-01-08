import React from "react";

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default Input;
