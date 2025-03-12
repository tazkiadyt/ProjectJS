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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulate data loading with a delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 1000); // Simulating a 1-second loading time
  }, []);

  // Data for charts
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
        tension: 0.4, // Smooth curve effect
      },
    ],
  };

  const userBarData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Users Status",
        data: [150, 50],
        backgroundColor: ["#c1121f", "#00b4d8"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      {/* Dashboard Content */}
      {!loading && (
        <>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Grid of Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rooms Section */}
            <AnimatedSection isVisible={isVisible} delay={200}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
                <HomeIcon className="h-10 w-10 text-red-500 mb-4 transition-transform duration-300 hover:scale-125 hover:rotate-12" />
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
            </AnimatedSection>

            {/* Users Section */}
            <AnimatedSection isVisible={isVisible} delay={400}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
                <UserGroupIcon className="h-10 w-10 text-yellow-500 mb-4 transition-transform duration-300 hover:scale-125 hover:-rotate-12" />
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
            </AnimatedSection>

            {/* Transactions Section */}
            <AnimatedSection isVisible={isVisible} delay={600}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 flex flex-col items-center">
                <CurrencyDollarIcon className="h-10 w-10 text-blue-500 mb-4 transition-transform duration-300 hover:scale-125 hover:rotate-12" />
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
            </AnimatedSection>
          </div>

          {/* Transactions Over Time Section */}
          <AnimatedSection isVisible={isVisible} delay={800}>
            <div className="bg-white p-4 mt-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300">
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
          </AnimatedSection>
        </>
      )}
    </div>
  );
};

// AnimatedSection Component for Staggered Animations
interface AnimatedSectionProps {
  isVisible: boolean;
  delay: number;
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ isVisible, delay, children }) => {
  return (
    <div
      className={`transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Dashboard;