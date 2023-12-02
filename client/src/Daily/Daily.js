import React from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import { allFirstDiv, allSecondDiv } from "../components/DesignStandardize";

const Daily = () => {
  return (
    <>
      <LeftPanel />
      <TopNavbar />
      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>Daily Customers</div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default Daily;
