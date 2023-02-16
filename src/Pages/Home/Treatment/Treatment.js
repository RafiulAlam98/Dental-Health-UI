import React from "react";
import treatment from "../../../assets/images/treatment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Treatment = () => {
  return (
    <div className="card max-w-[1000px]  flex-col lg:flex-row mx-auto mt-16 card-side bg-base-100 shadow-xl">
      <figure>
        <img className="rounded-lg" src={treatment} alt="treatment" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Exceptional Dental Care, on Your Terms</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <div className="card-actions justify-start">
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
