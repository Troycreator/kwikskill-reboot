// src/components/Services.jsx
import React from "react";

const services = [
  {
    title: "Electrician",
    rating: "4.9",
    price: "From R250/hr",
    desc: "Fault finding, wiring, installations and repairs by certified electricians.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Plumber",
    rating: "4.7",
    price: "From R300/hr",
    desc: "Leak repairs, pipe installations, geyser maintenance and more.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Academic Tutor",
    rating: "4.8",
    price: "From R200/hr",
    desc: "Personalized tutoring for high school and university students.",
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
];

const Services = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">Popular Services</h2>
      <p className="mt-4 max-w-2xl mx-auto text-center text-gray-500">
        Browse our most requested services in your area
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300"
          >
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {service.rating} <i className="fas fa-star"></i>
                </span>
              </div>
              <p className="mt-2 text-gray-600">{service.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-indigo-600 font-bold">{service.price}</span>
                <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition duration-300">
          View All Services <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  );
};

export default Services;