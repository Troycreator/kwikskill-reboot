// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import UpcomingBookings from "../components/UpcomingBookings";
import RecommendedServices from "../components/RecommendedServices";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({ name: 'User' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch('http://127.0.0.1:8000/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome back, {profile.name || 'User'}!
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{profile.name}</span>
            <div className="w-10 h-10 rounded-full bg-indigo-400"></div>
          </div>
        </header>

        {/* Upcoming Bookings */}
        <section className="mb-10">
          <UpcomingBookings />
        </section>

        {/* Recommended Services */}
        <section>
          <RecommendedServices />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
