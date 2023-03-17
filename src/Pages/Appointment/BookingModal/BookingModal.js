import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots, price } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const userName = form.username.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const booking = {
      appointmentDate: date,
      slot,
      treatment: name,
      patient: userName,
      email,
      phone,
      price,
    };

    fetch("https://doctor-service-server-tau.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          setTreatment(null);
          toast.success("Booking Confirmed");
          refetch();
        } else {
          setTreatment(null);
          toast.error(data.message`for ${booking.name}`);
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>

          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-4 mt-6"
          >
            <input
              disabled
              type="text"
              value={date}
              className="input w-full "
            />
            <select name="slot" className="select select-bordered w-full ">
              {slots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="treatmentName"
              type="text"
              defaultValue={name}
              disabled
              placeholder="Type here your name"
              className="input w-full "
            />
            <input
              name="username"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Type here your name"
              className="input w-full "
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              className="input w-full "
            />
            <input
              name="phone"
              type="text"
              placeholder="Type here your phone"
              className="input w-full "
              required
            />
            <input
              type="submit"
              value="Submit"
              className="input w-full bg-accent text-white"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
