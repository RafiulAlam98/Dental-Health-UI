import React from "react";
import cavity from "../../../assets/images/cavity.png";
import fluoride from "../../../assets/images/fluoride.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const serviceData = [
    {
      id: 1,
      name: "Fluoride Treatment",
      description:
        "Fluoride is a natural mineral that builds strong teeth and prevents cavities. It's been an essential oral health treatment for decades",
      icon: fluoride,
    },
    {
      id: 2,
      name: "Cavity Filling",
      description:
        " Amalgam has been used by dental professionals for more than a century; it is the most researched material used for filling cavities.",
      icon: cavity,
    },
    {
      id: 3,
      name: "Teeth Whitenning",
      description:
        "Combine 2 teaspoons (10 ml) of hydrogen peroxide with 1 teaspoon (6 grams) of baking soda and gently brush your teeth with the mixture.",
      icon: whitening,
    },
  ];
  return (
    <div className="mt-16">
      <div className="text-center">
        <h3 className="text-primary text-lg uppercase font-bold ">
          Our Services
        </h3>
        <h2 className="text-accent">Services We provide</h2>
      </div>
      <div className="grid gap-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((service) => (
          <Service key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
