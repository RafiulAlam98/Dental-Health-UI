import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {
  const { name, slots } = treatment;
  const date = format(selectedDate, "PP");

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const phone = form.phone.value;
    console.log(date, slot, name, phone);
    setTreatment(null);
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
              name="name"
              type="text"
              placeholder="Type here your name"
              className="input w-full "
            />
            <input
              name="email"
              type="email"
              placeholder="Type here your email"
              className="input w-full "
            />
            <input
              name="phone"
              type="text"
              placeholder="Type here your phone"
              className="input w-full "
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
