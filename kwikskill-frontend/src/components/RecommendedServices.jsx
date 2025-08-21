import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RecommendedServices = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: "Frontend Development",
      provider: "TechMasters Academy",
      price: 85.00,
      icon: "code"
    },
    {
      id: 2,
      title: "UI/UX Design",
      provider: "Design Pro Studio",
      price: 120.00,
      icon: "palette"
    },
    {
      id: 3,
      title: "Backend Development",
      provider: "CodeCraft Institute",
      price: 65.00,
      icon: "database"
    },
    {
      id: 4,
      title: "Mobile App Development",
      provider: "App Wizards",
      price: 45.00,
      icon: "mobile-alt"
    }
  ];

  const handleBookNow = (serviceId) => {
    navigate(`/dashboard/bookings/new/${serviceId}`);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recommended Services</h2>
        <Link 
          to="/services" 
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          See More
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div 
              className="h-40 bg-indigo-50 rounded-lg mb-4 flex items-center justify-center cursor-pointer"
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <i className={`fas fa-${service.icon} text-4xl text-indigo-400`}></i>
            </div>
            
            <h3 
              className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-indigo-600"
              onClick={() => navigate(`/services/${service.id}`)}
            >
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">By {service.provider}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-indigo-600 font-medium">
                ${service.price.toFixed(2)}
              </span>
              <button 
                onClick={() => handleBookNow(service.id)}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedServices;