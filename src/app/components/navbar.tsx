"use client"
import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">MyApp</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Menu Items */}
                <a
                  href="/dashboard"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="/room"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Room
                </a>
                <a
                  href="/users"
                  className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Users
                </a>

                {/* Dropdown for Transaction */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-white hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Transaction
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <a
                        href="/transaction/booking"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Booking
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;