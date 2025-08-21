import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock service data - replace with API call
  const service = {
    id: 1,
    title: "Web Development Mentoring",
    provider: {
      name: "John Doe",
      rating: 4.9,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    category: "Technology",
    location: "Johannesburg",
    price: "R350/hr",
    description: "Detailed description of the service...",
    features: [
      "One-on-one sessions",
      "Flexible scheduling",
      "Project-based learning",
      "Code review"
    ],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Images and Provider Info */}
        <div>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img
                src={service.provider.image}
                alt={service.provider.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{service.provider.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{service.provider.rating}</span>
                  <span className="ml-1 text-gray-600">
                    ({service.provider.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Service Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
              <span><i className="fas fa-tag mr-1"></i>{service.category}</span>
              <span><i className="fas fa-map-marker-alt mr-1"></i>{service.location}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{service.description}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">What's Included</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">
                  {service.price}
                </span>
                <button
                  onClick={() => {/* Add booking logic */}}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;