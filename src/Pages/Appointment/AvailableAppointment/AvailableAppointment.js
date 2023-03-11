import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentOption from "./AppointmentOption";

const AvailableAppointment = ({ selectedDate }) => {
 
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");

  const {data:appointmentOptions=[],refetch, isLoading} = useQuery({
    queryKey:['appointmentOptions',date],
    queryFn:async() =>{
      const result =  fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
      const data = (await result).json()
      return data
    }
  })

  if(isLoading){
    return <Loading/>
  }

  
  return (
    <section className="my-16 mx-6">
      <p className="text-center text-secondary font-bold">
        Available Services on {format(selectedDate, "PP")}
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appointmentOptions.map((option) => (
          <AppointmentOption
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingModal
          setTreatment={setTreatment}
          selectedDate={selectedDate}
          treatment={treatment}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
