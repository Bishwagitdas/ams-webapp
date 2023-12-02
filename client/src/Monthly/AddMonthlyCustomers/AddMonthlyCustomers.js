import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";
import LeftPanel from "../../components/LeftPanel";
import CustomerDetails from "./components/CustomerDetails";
import AdditionalInfo from "./components/AdditionalInfo";
import { allFirstDiv, allSecondDiv } from "../../components/DesignStandardize";
const AddMonthlyCustomers = () => {
  const [toggleState, setToggleState] = useState(1);
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };
  return (
    <>
      <TopNavbar />
      <LeftPanel />

      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          <p className="text-[28px] font-extrabold pb-10 border-b-2 border-gray-200">
            Add Monthly Customer
          </p>

          <div className="tabs text-[28px]">
            <a
              className={`tab tab-bordered ${
                toggleState === 1 && "tab-active"
              }`}
              onClick={() => {
                changeTab(1);
              }}
            >
              Overview
            </a>
            <a
              className={`tab tab-bordered ${
                toggleState === 2 && "tab-active"
              }`}
              onClick={() => {
                changeTab(2);
              }}
            >
              Additional Information
            </a>
          </div>

          {toggleState === 1 ? <CustomerDetails /> : <AdditionalInfo />}
        </div>
        <div className="h-20" />
      </div>
    </>
  );
};

export default AddMonthlyCustomers;
