// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Sarah K.",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    quote: "The electrician I booked through KwikSkill was professional and fixed my wiring issue in no time. The platform made it so easy to find help!",
  },
  {
    name: "Thabo M.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "As a tutor on KwikSkill, I've been able to connect with students who need my help. The platform handles payments and scheduling, so I can focus on teaching.",
  },
  {
    name: "Nomsa D.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "When my geyser burst, I found a plumber on KwikSkill who came within 2 hours. The service was excellent and the pricing was transparent.",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">What Our Customers Say</h2>
      <p className="mt-4 max-w-2xl mx-auto text-center text-gray-500">
        Hear from people who've used KwikSkill services
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full" src={t.image} alt={t.name} />
              <div className="ml-4">
                <h4 className="font-medium">{t.name}</h4>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">"{t.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
