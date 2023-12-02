import React from "react";
import { Link } from "react-router-dom";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { blackLinkButton } from "../../components/DesignStandardize";
const MCFirstSection = () => {
  return (
    <>
      <div className="flex flex-col gap-1 pb-8 border-b-2 border-gray-200 font-[Poppins]">
        <span className="text-3xl font-extrabold text-black">
          Monthly Customers
        </span>
        <p className="text-[#9FA1A6]">
          View your customers here. You can also add and delete them here.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div>
          <p className="text-[#0084FF] text-lg border-b-2 border-[#0084FF] px-2 w-max">
            Total Monthly customers
          </p>
        </div>

        {/* To add new customer */}
        <Link className={`${blackLinkButton}`} to="/addCustomer">
          Add Customers <RightArrowIcon />
        </Link>
      </div>
    </>
  );
};

export default MCFirstSection;
