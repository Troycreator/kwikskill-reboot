import React from "react";

const steps = [
  {
    number: 1,
    title: "Find a Service",
    description:
      "Browse our wide range of services or search for exactly what you need.",
  },
  {
    number: 2,
    title: "Book & Pay Securely",
    description:
      "Select your preferred provider, choose a time and pay with our secure payment options.",
  },
  {
    number: 3,
    title: "Get Help",
    description:
      "Your skilled professional arrives at the scheduled time to complete the job.",
  },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">How KwikSkill Works</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-gray-500">Get help in just 3 simple steps</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;