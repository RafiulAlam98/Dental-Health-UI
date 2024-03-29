import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [isUserAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100  text-base-content">
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>

            {isUserAdmin && (
              <li>
                <Link to="/dashboard/allusers">All Users</Link>
              </li>
            )}

            {isUserAdmin && (
              <li>
                <Link to="/dashboard/addDoctor">Add a Doctor</Link>
              </li>
            )}

            {isUserAdmin && (
              <li>
                <Link to="/dashboard/manageDoctors">Manage A Doctor</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
