import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchServices } from '../../utils/api';
import defaultServiceImage from '../../assets/default-service.png';

// Define categories array
const SERVICE_CATEGORIES = [
  'All',
  'Development',
  'Design',
  'Marketing',
  'Writing',
  'Teaching',
  'Consulting'
];

const ServiceListing = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.service_description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <>
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          KwikSkill
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/services" className="text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link 
            to="/become-provider" 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
          >
            Become a Provider
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <button 
              onClick={handleSignOut}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4">{error}</div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Local Services</h1>
              <p className="text-gray-600">Book skilled professionals near you</p>
              
              <div className="mt-6 relative">
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-search absolute left-4 top-4 text-gray-400"></i>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                {SERVICE_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition ${
                      selectedCategory === category 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className="service-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <div 
                    className="h-48 bg-cover bg-center bg-gray-100" 
                    style={{ 
                      backgroundImage: `url(${service.image || defaultServiceImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!service.image && (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">{service.title}</h3>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                        R{service.hourly_rate}/hr
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{service.service_description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Skills: {service.skills}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {service.availability}
                      </div>
                      <div className="text-sm text-blue-600">
                        By {service.provider_name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ServiceListing;