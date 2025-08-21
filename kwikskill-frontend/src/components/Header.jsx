import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getProfileImage = () => {
    return currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.email}`;
  };

  const getUserDisplayName = () => {
    return currentUser?.displayName || currentUser?.email;
  };

  const renderDropdownMenu = () => {
    if (!isDropdownOpen) return null;

    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
        <button
          onClick={handleProfileClick}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Your Profile
        </button>
        <button
          onClick={handleSettingsClick}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    );
  };

  const renderSidebarToggle = () => (
    <button
      onClick={toggleSidebar}
      className="md:hidden text-gray-600 hover:text-gray-900"
    >
      <i className="fas fa-bars text-xl"></i>
    </button>
  );

  const renderUserInfo = () => (
    <button
      onClick={toggleDropdown}
      className="flex items-center space-x-3 focus:outline-none"
    >
      <img
        src={getProfileImage()}
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />
      <span className="hidden md:block text-gray-700">
        {getUserDisplayName()}
      </span>
    </button>
  );

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-20">
      {renderSidebarToggle()}
      <div className="flex items-center space-x-4">
        <div className="relative">
          {renderUserInfo()}
          {renderDropdownMenu()}
        </div>
      </div>
    </header>
  );
};

export default Header;