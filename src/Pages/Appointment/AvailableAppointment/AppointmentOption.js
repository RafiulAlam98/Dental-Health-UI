import React from "react";

const AppointmentOption = ({ option, setTreatment }) => {
  const { name, slots } = option;
  return (
    <div className="card  shadow-xl">
      <div className="card-body">
        <h2 className="text-secondary text-center font-bold text-2xl">
          {name}
        </h2>
        <p className="text-center">
          {slots.length > 0 ? slots[0] : "Try another date"}
        </p>
        <p className="text-center">
          {slots.length} {slots.length > 1 ? "spaces" : "space"} are available
        </p>
        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            className="btn btn-secondary text-white"
            onClick={() => setTreatment(option)}
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
