'use client'
// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaUser , FaDoorOpen, FaClipboardList } from 'react-icons/fa';

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="flex space-x-6">
          <Link href="/dashboard">
            <span className="text-white flex items-center hover:text-gray-300 transition duration-200 cursor-pointer">
              <FaHome className="mr-1" /> Dashboard
            </span>
          </Link>
          <Link href="/room">
            <span className="text-white flex items-center hover:text-gray-300 transition duration-200 cursor-pointer">
              <FaClipboardList className="mr-1" /> Room
            </span>
          </Link>
          <Link href="/user">
            <span className="text-white flex items-center hover:text-gray-300 transition duration-200 cursor-pointer">
              <FaUser  className="mr-1" /> User
            </span>
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsBookingOpen(!isBookingOpen)}
              className="text-white flex items-center hover:text-gray-300 transition duration-200 cursor-pointer"
            >
              <FaDoorOpen className="mr-1" /> Transaksi
            </button>
            {isBookingOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link href="/transaksi/booking">
                  <span className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200 cursor-pointer">Booking</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;