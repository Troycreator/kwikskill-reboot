import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService } from '../utils/api';
import { SERVICE_CATEGORIES } from '../utils/constants';

const BecomeProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    service_description: '',
    hourly_rate: '',
    category: '',
    skills: '',
    availability: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createService(formData);
      navigate('/dashboard/provider');
    } catch (error) {
      console.error('Error creating service:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-3xl font-extrabold text-white">
              Become a Service Provider
            </h2>
            <p className="mt-2 text-indigo-100">
              Share your expertise and start earning
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                name="service_description"
                value={formData.service_description}
                onChange={(e) => setFormData({...formData, service_description: e.target.value})}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select a category</option>
                {SERVICE_CATEGORIES.filter(cat => cat !== 'All').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hourly Rate (R) *
              </label>
              <input
                type="number"
                name="hourly_rate"
                value={formData.hourly_rate}
                onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                required
                min="0"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Skills Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Skills *
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                required
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-400"
                placeholder="e.g., React, Node.js, UI Design"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${
                loading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Creating...' : 'Create Service'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;