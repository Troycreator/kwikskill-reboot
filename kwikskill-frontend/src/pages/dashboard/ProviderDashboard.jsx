import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProviderServices } from '../../utils/api';

const ProviderDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchProviderServices();
        setServices(data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading provider services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Services</h1>
        <button
          onClick={() => navigate('/become-provider')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Add New Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No services found. Click "Add New Service" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div 
              key={service.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    R{service.price}/hr
                  </span>
                  <div className="space-x-2">
                    <button 
                      onClick={() => navigate(`/services/${service.id}/edit`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;