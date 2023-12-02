import React, { useEffect, useState } from "react";
import LogOut from "./LogOut";
const SessionMenu = () => {
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState("");
  const isUserLoggedIn = window.localStorage.getItem("userLogin");

  const fetchUser = async () => {
    await fetch("http://localhost:4000/userProfile/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUser(data.data);
      });
  };
  const fetchAdmin = async () => {
    await fetch("http://localhost:4000/adminProfile/adminData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "adminData");
        setAdmin(data.data);
        if (data.data === "token expired") {
          alert("token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  };
  useEffect(() => {
    if (isUserLoggedIn) {
      fetchUser();
    } else {
      fetchAdmin();
    }
  }, []);

  return (
    <div className="font-semibold my-auto dropdown dropdown-end font-[Poppins]">
      <label tabIndex={0}>
        <p className="tooltip tooltip-bottom flex gap-1 items-center cursor-pointer">
          {isUserLoggedIn ? (
            <p className=" bg-blue-300 w-8 h-8 rounded-full text-lg text-blue-800">
              {user?.username?.charAt(0).toUpperCase()}
            </p>
          ) : (
            <p className=" bg-blue-300 w-8 h-8 rounded-full text-lg text-blue-800">
              {admin?.username?.charAt(0).toUpperCase()}
            </p>
          )}
        </p>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] mt-2 menu p-5 shadow bg-base-100 rounded-box w-52 flex flex-col gap-6 text-lg"
      >
        {isUserLoggedIn ? (
          // Info about user
          <div className="flex flex-col gap-1 items-center">
            <p>{user?.username?.toUpperCase()}</p>
            <p>{user?.email}</p>
            <p>{user?.designation}</p>
          </div>
        ) : (
          // Info about admin
          <div className="flex flex-col gap-1 items-center">
            <p>{admin?.username?.toUpperCase()}</p>
            <p>{admin?.email}</p>
          </div>
        )}

        {/* Logout Button */}
        <LogOut />
      </ul>
    </div>
  );
};

export default SessionMenu;
