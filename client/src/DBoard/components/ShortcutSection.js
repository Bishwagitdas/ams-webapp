import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

const ShortcutSection = () => {
  const shortcuts = [
    { text: "Add New Customers", to: "/monthly-customer" },
    { text: "My Profile", to: "/dashboard" },
    { text: "Weight Addition", to: "/dashboard" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <p className="text-xl font-bold">Your Shortcuts</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-max">
        {shortcuts.map((el, i) => {
          return (
            <Link to={el.to} key={i} className="btn btn-md w-max">
              {el.text}
              <ArrowOutwardIcon style={{ fontSize: "1rem" }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShortcutSection;
