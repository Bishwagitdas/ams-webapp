import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const LogOut = (leftPannel) => {
  // Function for Log out
  const Logout = () => {
    if (window.localStorage.getItem("adminloggedIn")) {
      window.localStorage.removeItem("adminloggedIn");
      window.location.href = "/";
    } else {
      window.localStorage.removeItem("userLogin");
      window.location.href = "/";
    }
  };
  return (
    <Link
      className="py-1 px-3 flex gap-1 items-center bg-slate-100 hover:bg-slate-200 rounded-md w-max m-auto shadow-md"
      onClick={Logout}
    >
      <span className="-mt-[2px]">
        <LogoutIcon fontSize="8px" />
      </span>
      <span className="font-semibold text-lg my-auto">Logout</span>
    </Link>
  );
};

export default LogOut;
