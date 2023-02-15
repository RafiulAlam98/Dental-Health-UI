import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "./InfoCard";

const InfoCards = () => {
  const cardItem = [
    {
      id: 1,
      name: "Openning Hours",
      description: "9.00 am to 5.00pm",
      icon: clock,
      bgColor: "bg-gradient-to-r from-primary to-secondary text-white",
    },
    {
      id: 2,
      name: "Visit Our Location",
      description: "Section-2, Mirpur",
      icon: marker,
      bgColor: "bg-accent",
    },
    {
      id: 1,
      name: "Contact us now",
      description: "+88013671000100",
      icon: phone,
      bgColor: "bg-gradient-to-r from-primary to-secondary text-white",
    },
  ];
  return (
    <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardItem.map((card) => (
        <InfoCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default InfoCards;
