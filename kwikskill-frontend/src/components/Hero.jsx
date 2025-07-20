// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="gradient-bg text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="md:text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Book Local Services in a Kwik</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl">
            South Africa's fastest growing microservice booking platform connecting skilled professionals with people who need help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Find Services <i className="fas fa-search ml-2"></i>
            </button>
            <button className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition duration-300 transform hover:scale-105">
              Offer Services <i className="fas fa-briefcase ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
