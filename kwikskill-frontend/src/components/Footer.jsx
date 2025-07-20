// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">KwikSkill</h3>
            <p className="text-gray-400">
              South Africa's fastest growing microservice booking platform connecting skilled professionals with people who need help.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Become a Provider</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Safety Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f text-xl" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter text-xl" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram text-xl" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in text-xl" /></a>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <button className="bg-black text-white px-3 py-1 rounded flex items-center">
                  <i className="fab fa-apple mr-1" /> App Store
                </button>
                <button className="bg-black text-white px-3 py-1 rounded flex items-center">
                  <i className="fab fa-google-play mr-1" /> Play Store
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KwikSkill. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
