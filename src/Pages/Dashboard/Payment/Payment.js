import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);
const Payment = () => {
  const booking = useLoaderData();

  return (
    <div>
      <h2>Payment for {booking.treatment}</h2>
      <p className="text-xl">
        Please pay <strong>${booking.price}</strong> for your appointment.
      </p>
      <div className="w-96 my-9">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
