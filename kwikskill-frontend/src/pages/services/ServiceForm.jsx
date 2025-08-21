import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceForm = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    price: '',
    description: '',
    features: [''],
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your API call here
      navigate('/dashboard/services');
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureAdd = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleFeatureRemove = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Edit Service' : 'Create New Service'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (per hour)
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...formData.features];
                  newFeatures[index] = e.target.value;
                  setFormData({...formData, features: newFeatures});
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleFeatureRemove(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleFeatureAdd}
            className="text-indigo-600 hover:text-indigo-700"
          >
            <i className="fas fa-plus mr-1"></i>
            Add Feature
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard/services')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;