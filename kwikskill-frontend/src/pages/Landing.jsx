// src/pages/Landing.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import PaymentPartners from "../components/PaymentPartners";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <PaymentPartners />
      <Footer />
    </>
  );
};

export default Landing;
