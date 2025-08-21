// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBecomeProvider = () => {
    if (!currentUser) {
      // If not logged in, redirect to login with return path
      navigate('/login?redirect=/become-provider');
      return;
    }
    // If logged in, go to provider registration
    navigate('/become-provider');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">KwikSkill</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </Link>
              <Link to="/#howitworks" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                How It Works
              </Link>
              <button
                onClick={handleBecomeProvider}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Become a Provider
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!currentUser ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">
                  Log in
                </Link>
                <Link to="/signup" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700">
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-500 hover:text-gray-700">
                  Profile
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
