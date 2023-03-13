import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = res.json();
      return data;
    },
  });

  const handleMakeAdmin = (email) => {
    console.log(email);
    fetch(`http://localhost:5000/users/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successfully");
          return refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="3xl mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((allUser, i) => {
              return (
                <tr key={allUser._id}>
                  <th>{i + 1}</th>
                  <td>{allUser.name}</td>
                  <td>{allUser.email}</td>
                  <td>
                    {allUser?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(allUser.email)}
                        className="btn btn-xs text-white btn-primary"
                      >
                        Make admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-xs text-white btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
