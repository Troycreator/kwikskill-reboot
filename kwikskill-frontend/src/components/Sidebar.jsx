import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BecomeProviderModal from './BecomeProviderModal';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isProvider, setIsProvider] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);

  useEffect(() => {
    const checkProviderStatus = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch('http://127.0.0.1:8000/users/check-provider-status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsProvider(data.is_provider);
        }
      } catch (error) {
        console.error('Failed to check provider status:', error);
      }
    };

    if (currentUser) {
      checkProviderStatus();
    }
  }, [currentUser]);

  const handleProviderSuccess = () => {
    setIsProvider(true);
  };

  const navItems = [
    { path: '/dashboard', icon: 'fa-home', label: 'Dashboard' },
    { path: '/dashboard/bookings', icon: 'fa-calendar-alt', label: 'My Bookings' },
    { path: '/dashboard/profile', icon: 'fa-user', label: 'Profile' },
    { path: '/dashboard/settings', icon: 'fa-cog', label: 'Settings' },
    // Add become provider as a nav item
    !isProvider ? {
      path: '/dashboard/become-provider',
      icon: 'fa-star',
      label: 'Become a Provider',
      onClick: () => setShowProviderModal(true)
    } : {
      path: '/dashboard/services',
      icon: 'fa-briefcase',
      label: 'My Services'
    }
  ];

  return (
    <div className={`fixed md:static inset-y-0 left-0 transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 transition duration-200 ease-in-out bg-white w-64 shadow-lg z-30`}>
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
        >
          KwikSkill
        </button>
      </div>

      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-6 py-3 flex items-center space-x-3 ${
              location.pathname === item.path
                ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
            } transition-all duration-200`}
            onClick={() => {
              setIsOpen(false);
              item.onClick && item.onClick();
            }}
          >
            <i className={`fas ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;