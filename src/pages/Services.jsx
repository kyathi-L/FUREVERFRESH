import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import "../styles/Services.css";


const servicesData = [
  {
    _id: "67fe2f54043ccb1674cef541",
    name: "Pet Boarding",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeUKTrrJx12b9Y8iB9vr2fiINKiSTCO0JMXw&s",
    price: {
      basic: 500,
      premium: 900,
    },
  },
  {
    _id: "67fe2f54043ccb1674cef542",
    name: "Pet Grooming",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtFrl2er0j4oh1lJndOVsgjhmwxxR_SKMxw&s",
    price: {
      basic: 300,
      premium: 600,
    },
  },
  {
    _id: "67fe2f54043ccb1674cef543",
    name: "Pet Veterinary",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwDEZzojrrPwylZb8N26mTFFkwpxIjezvICbNH8nyPysoPetH_K6sLONkGXNqTFuJUuM&usqp=CAU",
    price: {
      basic: 800,
      premium: 1500,
    },
  },
  {
    _id: "67fe2f54043ccb1674cef544",
    name: "Pet Adoption",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx-LWWlQVIyFcxzC7MLyKk_7LXGbhdmOrA_A&s",
    price: {
      basic: 0,
      premium: 0,
    },
  },
  {
    _id: "67fe2f54043ccb1674cef545",
    name: "Pet Photography",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9TihLRA9Xj-Q6hByMbQlJSCbUcDUd-gfLw&s",
    price: {
      basic: 1000,
      premium: 1800,
    },
  },
];

const Services = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    if (service.name === "Pet Adoption") {
      navigate("/adopt");
    } else {
      setSelectedService(service);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="services-section">
        <div className="services-header">
          <h2>Our Services</h2>
        </div>

        <div className="services-container">
          {servicesData.map((service) => (
            <div key={service._id} className="service-box">
              <img src={service.img} alt={service.name} />
              <div className="service-overlay">
                <h3>{service.name}</h3>
                <button className="book-now" onClick={() => handleBookNow(service)}>
                  {service.name === "Pet Adoption" ? "Adopt" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {open && selectedService && (
          <BookingForm
            open={open}
            handleClose={() => setOpen(false)}
            serviceData={selectedService}
            servicePrices={selectedService.price}
          />
        )}
      </div>
    </>
  );
};

export default Services;
