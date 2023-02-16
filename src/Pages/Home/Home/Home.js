import React from "react";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import InfoCards from "../InfoCards/InfoCards";
import MakeAppointment from "../MakeAppointment/MakeAppointment";

import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";
import Treatment from "../Treatment/Treatment";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner />
      <InfoCards />
      <Services />
      <Treatment />
      <MakeAppointment />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
