import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

const Sidebar = () => {
  const { logout } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get token from either storage
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Clear both storage types
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("userEmail");

        // Execute global context logout
        logout();
        // Navigate to login
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear storage and logout on frontend if backend fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userEmail");

      logout();
      navigate("/login");
    }
  };
  return (
    <div className="w-64 h-auto bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col shadow-xl">
      <h2 className="text-3xl p-6 font-bold border-b border-gray-700 bg-gray-800">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Admin Panel
        </span>
      </h2>

      <ul className="flex flex-col h-screen space-y-1 py-4">
        <li className="px-4">
          <Link
            to="/customerfeedback"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            Customer Request
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/admin"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Tour Packages
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/managedestinations"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Manage Destinations
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/manageplaces"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Manage Places
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/food"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Manage Food
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/manageculture"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Manage Culture
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/managevisit"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
            Manage Must Visit
          </Link>
        </li>

        <li className="px-4">
          <Link
            to="/dolist"
            className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-1"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Things to do
          </Link>
        </li>

        <li className="px-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-red-600 bg-red-500 text-white"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
