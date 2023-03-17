import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const {
    data: specialities = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Speciality"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctor-service-server-tau.vercel.app/appointmentSpeciality"
      );
      const data = res.json();
      return data;
    },
  });

  const handleDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success === true) {
          const doctor = {
            name: data.name,
            email: data.email,
            speciality: data.speciality,
            image: imgData.data.url,
          };
          //save doctor information to the database
          fetch("https://doctor-service-server-tau.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                toast.success(`${data.name} is added successfully`);
                navigate("/dashboard/manageDoctors");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-96 p-7">
      <h2 className="3xl">Add A Doctor</h2>
      <form onSubmit={handleSubmit(handleDoctor)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", { required: "name is required" })}
            type="text"
            className="input input-bordered w-full "
          />
          {errors.name && (
            <p role="alert" className="text-red-600">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text"> Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            className="input input-bordered w-full "
          />
          {errors.email && (
            <p role="alert" className="text-red-600">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Speciality</span>
          </label>
          <select
            {...register("speciality", { required: "speciality is required" })}
            className="select select-ghost w-full max-w-xs input input-bordered"
          >
            {specialities.map((speciality) => (
              <option key={speciality._id}>{speciality.name}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("image", { required: "image is required" })}
            type="file"
            className="input input-bordered w-full "
          />
          {errors.image && (
            <p role="alert" className="text-red-600">
              {errors.name?.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value="Add Doctor"
          className="btn w-full btn-accent text-white mt-3"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
