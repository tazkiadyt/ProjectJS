"use client";
import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
// Import Heroicons
import { HomeIcon, UserGroupIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const Dashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animasi fade-in saat komponen dimuat
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pieData = {
    labels: ["Available", "Occupied"],
    datasets: [
      {
        data: [30, 20],
        backgroundColor: ["#c1121f", "#00b4d8"],
      },
    ],
  };

  const barData = {
    labels: ["Rooms", "Users", "Transactions"],
    datasets: [
      {
        label: "Count",
        data: [50, 200, 500],
        backgroundColor: ["#c1121f", "#FFC107", "#00b4d8"],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Transactions Over Time",
        data: [100, 120, 150, 180, 200],
        borderColor: "#c1121f",
        fill: false,
        tension: 0.4, // Efek kurva pada garis
      },
    ],
  };

  const userBarData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "User Status",
        data: [150, 50],
        backgroundColor: ["#c1121f", "#00b4d8"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Rooms Section */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
          <HomeIcon className="h-10 w-10 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-3">Rooms</h2>
          <p>Total Rooms: 50</p>
          <p>Available: 30</p>
          <p>Occupied: 20</p>
          <Pie
            data={pieData}
            options={{
              animation: {
                duration: 1000,
                easing: "easeInOutQuad",
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Value: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Users Section with Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
          <UserGroupIcon className="h-10 w-10 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-3">Users</h2>
          <p>Total Users: 200</p>
          <p>Active: 150</p>
          <p>Inactive: 50</p>
          <Bar
            data={userBarData}
            options={{
              animation: {
                duration: 1000,
                easing: "easeInOutQuad",
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Value: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
          <CurrencyDollarIcon className="h-10 w-10 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-3">Transactions</h2>
          <p>Total Transactions: 500</p>
          <p>Completed: 450</p>
          <p>Pending: 50</p>
          <Bar
            data={barData}
            options={{
              animation: {
                duration: 1000,
                easing: "easeInOutQuad",
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (tooltipItem) => {
                      return `Value: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Transactions Over Time Section */}
      <div
        className={`bg-white p-4 mt-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-xl font-semibold mb-3">Transactions Over Time</h2>
        <Line
          data={lineData}
          options={{
            animation: {
              duration: 1000,
              easing: "easeInOutQuad",
            },
            plugins: {
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (tooltipItem) => {
                    return `Value: ${tooltipItem.raw}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;