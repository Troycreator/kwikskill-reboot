// src/components/PaymentPartners.jsx
import React from "react";

const logos = [
  {
    alt: "SnapScan",
    src: "https://ghcc.tv/wp-content/uploads/2021/05/snapscan-logo-1.png",
    height: "h-12",
  },
  {
    alt: "Ozow",
    src: "https://signup.ozow.com/images/ozow-black-plain.png",
    height: "h-12",
  },
  {
    alt: "FNB",
    src: "https://logos-world.net/wp-content/uploads/2022/11/FNB-Logo-New.png",
    height: "h-12",
  },
  {
    alt: "Visa",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    height: "h-8",
  },
  {
    alt: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png",
    height: "h-10",
  },
  {
    alt: "PayPal",
    src: "https://static.vecteezy.com/system/resources/previews/022/100/701/large_2x/paypal-logo-transparent-free-png.png",
    height: "h-40",
  },
];

const PaymentPartners = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-lg font-medium text-gray-500 mb-8">Trusted Payment Partners</h3>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img src={logo.src} alt={logo.alt} className={logo.height} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentPartners;
