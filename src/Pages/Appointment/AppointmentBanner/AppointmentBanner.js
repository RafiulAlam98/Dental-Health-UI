import React from "react";
import { DayPicker } from "react-day-picker";
import appointment from "../../../assets/images/appointment.png";
import chair from "../../../assets/images/chair.png";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header
      className="my-6 p-3"
      style={{
        background: `url(${appointment})`,
        backgroundSize: "cover",
      }}
    >
      <div className="hero  ">
        <div className="hero-content flex-col lg:flex-row-reverse justify-center items-center">
          <img
            src={chair}
            className="md:w-1/2 sm:w-1/2 rounded-lg shadow-2xl"
            alt="dentist-chair"
          />
          <div className="lg:mr-8 bg-gradient-to-r from-primary to-secondary">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
