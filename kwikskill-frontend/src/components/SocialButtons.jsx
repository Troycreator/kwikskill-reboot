import React from "react";

const SocialButtons = () => (
  <div className="mt-6 grid grid-cols-2 gap-3">
    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50">
      <i className="fab fa-google text-red-500 mr-2"></i> Google
    </button>
    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm text-gray-500 hover:bg-gray-50">
      <i className="fab fa-facebook-f text-blue-600 mr-2"></i> Facebook
    </button>
  </div>
);

export default SocialButtons;
