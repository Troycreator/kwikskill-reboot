import React from 'react';

const Bookings = () => {
  const bookings = [
    {
      id: 1,
      service: "Web Development Mentoring",
      provider: "John Doe",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "confirmed",
      price: 120.00
    },
    {
      id: 2,
      service: "UI/UX Design Review",
      provider: "Jane Smith",
      date: "2023-06-18",
      time: "2:00 PM",
      status: "pending",
      price: 85.00
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {booking.service}
                </h3>
                <p className="text-gray-600 text-sm">
                  with {booking.provider}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <i className="far fa-calendar-alt mr-2"></i>
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <i className="far fa-clock mr-2"></i>
              <span>{booking.time}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-indigo-600 font-medium">
                ${booking.price.toFixed(2)}
              </span>
              <div className="space-x-2">
                <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition duration-200">
                  Reschedule
                </button>
                <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-200">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;