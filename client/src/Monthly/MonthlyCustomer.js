import React from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import MCFirstSection from "./components/MCFirstSection";
import MCTable from "./components/MCTable";
import { allFirstDiv, allSecondDiv } from "../components/DesignStandardize";

const MonthlyCustomer = () => {
  return (
    <>
      <LeftPanel />
      <TopNavbar />
      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          <MCFirstSection />
          <MCTable />
        </div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default MonthlyCustomer;
