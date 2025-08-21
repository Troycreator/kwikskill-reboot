import React from 'react';

const UpcomingBookings = () => {
  const bookings = [
    {
      id: 1,
      title: "Web Development Session",
      status: "confirmed",
      date: "June 15, 2023",
      time: "10:00 AM - 2:00 PM",
      price: 120.00
    },
    {
      id: 2,
      title: "UI/UX Design Review",
      status: "pending",
      date: "June 18, 2023",
      time: "7:30 PM - 9:30 PM",
      price: 75.00
    },
    {
      id: 3,
      title: "Mobile App Development",
      status: "confirmed",
      date: "June 20, 2023",
      time: "8:00 AM - 9:00 AM",
      price: 25.00
    }
  ];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          View All
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800">{booking.title}</h3>
              <span className={`${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              } text-xs px-2 py-1 rounded-full`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-2">
              <i className="far fa-calendar-alt mr-2"></i>
              <span>{booking.date}</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <i className="far fa-clock mr-2"></i>
              <span>{booking.time}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-indigo-600 font-medium">
                ${booking.price.toFixed(2)}
              </span>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingBookings;