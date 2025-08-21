import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Email notifications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleNotificationChange('sms')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">SMS notifications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Marketing emails</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>
        <div className="space-y-4">
          <button className="text-red-600 hover:text-red-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;