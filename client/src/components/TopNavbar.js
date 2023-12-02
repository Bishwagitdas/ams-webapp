import React from "react";
import { Link, useLocation } from "react-router-dom";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import SessionMenu from "./SessionMenu";

const TopNavbar = () => {
  const location = useLocation();

  return (
    <div className="z-20 fixed top-0 right-0 h-14 w-full bg-white shadow-md flex justify-between px-4 md:px-8 lg:px-4 font-[Poppins]">
      {/* To see the path */}
      <div className="lg:ml-72 flex gap-1 items-center">
        <Link to="/dashboard" className="bg-black px-3 py-1 w-max text-white">
          S
        </Link>
        <RightArrowIcon />
        {location.pathname === "/dashboard" ? (
          <p>Dashboard</p>
        ) : location.pathname === "/monthly-customer" ? (
          <p>Monthly Customers</p>
        ) : location.pathname === "/daily-customer" ? (
          <p>Daily Customers</p>
        ) : location.pathname === "/users" ? (
          <p>Users</p>
        ) : location.pathname === "/settings" ? (
          <p>Settings</p>
        ) : location.pathname === "/addCustomer" ? (
          <div className="flex">
            <Link className="hover:underline" to="/monthly-customer">
              Monthly Customers
            </Link>

            <p className="md:block hidden">
              <RightArrowIcon />
              Add Monthly Customers
            </p>
          </div>
        ) : location.pathname === "/bill" ? (
          <div className="flex">
            <Link className="hover:underline" to="/monthly-customer">
              Monthly Customers
            </Link>

            <p className="md:block hidden">
              <RightArrowIcon />
              Bill Generate
            </p>
          </div>
        ) : location.pathname.includes("/update/") ? (
          <div className="flex">
            <Link className="hover:underline" to="/monthly-customer">
              Monthly Customers
            </Link>

            <p className="md:block hidden">
              <RightArrowIcon />
              Monthly Record
            </p>
          </div>
        ) : location.pathname.includes("/userEdit/") ? (
          <div className="flex">
            <Link className="hover:underline" to="/users">
              Users
            </Link>

            <p className="md:block hidden">
              <RightArrowIcon />
              User Edit
            </p>
          </div>
        ) : location.pathname === "/seeTable" ? (
          <div className="flex">
            <p>See Table</p>
          </div>
        ) : location.pathname === "/upload" ? (
          <div className="flex">
            <p>Upload Excel File</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <SessionMenu />
    </div>
  );
};

export default TopNavbar;
