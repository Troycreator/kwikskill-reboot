import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Add your booking API call here
      navigate('/dashboard/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Service</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={booking.date}
            onChange={(e) => setBooking({...booking, date: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            required
            value={booking.time}
            onChange={(e) => setBooking({...booking, time: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            value={booking.notes}
            onChange={(e) => setBooking({...booking, notes: e.target.value})}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;