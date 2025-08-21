import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth, updateProfile } from '../utils/api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',  // Changed from displayName to name
    bio: '',
    skills: '',
    location: ''
  });
  const [error, setError] = useState('');

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchWithAuth('http://127.0.0.1:8000/users/profile');
        setProfile(data);
      } catch (error) {
        setError('Failed to load profile: ' + error.message);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchWithAuth('http://127.0.0.1:8000/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${profile.name}`}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {profile.name || 'User'}
            </h2>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>
              <input
                type="text"
                value={profile.skills}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g. React, Node.js, Python"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Bio</h3>
              <p className="text-gray-600 mt-1">{profile.bio || 'No bio added yet'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Skills</h3>
              <p className="text-gray-600 mt-1">{profile.skills || 'No skills added yet'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Location</h3>
              <p className="text-gray-600 mt-1">{profile.location || 'No location added yet'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;