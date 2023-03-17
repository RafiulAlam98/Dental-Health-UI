import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch(
        "https://doctor-service-server-tau.vercel.app/doctors",
        {
          method: "GET",
          headers: {
            authorization: `beare ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (doctor) => {
    fetch(
      `https://doctor-service-server-tau.vercel.app/doctors/${doctor.email}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${doctor.name} deleted successfully`);
        }
      });
  };
  return (
    <div>
      <h2 className="3xl">Manage Doctors</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>

              <th>Email</th>
              <th>Speciality</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, i) => {
              return (
                <tr key={doctor._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={doctor.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.speciality}</td>
                  <td>
                    <label
                      onClick={() => {
                        setDeletingDoctor(doctor);
                      }}
                      htmlFor="confirmation-modal"
                      className="btn btn-xs text-white btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
          successAction={handleDelete}
          successButtonName="Delete"
          modalData={deletingDoctor}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ManageDoctors;
