import React from "react";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const ContactUs = () => {
  const Input = (
    <React.Fragment>
      {" "}
      <div className="mt-1 pb-4">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-3/4  lg:w-1/2 "
        />
      </div>
    </React.Fragment>
  );
  return (
    <section
      className="mt-16 mx-auto flex-col"
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className="text-center pt-4">
        <h2 className="text-sm text-primary">Contact Us</h2>
        <h1 className="text-2xl text-white mb-4">Stay connected with us </h1>
      </div>

      <div className=" text-center flex flex-col justify-center ">
        {Input}
        {Input}
        {Input}
        <div className="w-1/2 lg:w-3/4 mx-auto pb-4">
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
