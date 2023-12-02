import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";
import LeftPanel from "../../components/LeftPanel";
import MCAddData from "./components/MCAddData";
import MCMonthTable from "./components/MCMonthTable";
import { useParams } from "react-router-dom";
import { allFirstDiv, allSecondDiv } from "../../components/DesignStandardize";
import CustomerDetails from "../AddMonthlyCustomers/components/CustomerDetails";
import ShowDiffRate from "../components/ShowDiffRate";
const MCUpdate = () => {
  const id = useParams();
  const EncryptedID = useParams();
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
          <div className="tabs text-[28px]">
            <p
              className={`tab tab-bordered ${
                toggleState === 1 && "tab-active"
              }`}
              onClick={() => {
                changeTab(1);
              }}
            >
              Add Data
            </p>
            <p
              className={`tab tab-bordered ${
                toggleState === 2 && "tab-active"
              }`}
              onClick={() => {
                changeTab(2);
              }}
            >
              See Table
            </p>
            <p
              className={`tab tab-bordered ${
                toggleState === 3 && "tab-active"
              }`}
              onClick={() => {
                changeTab(3);
              }}
            >
              Show different Rate
            </p>
          </div>

          {toggleState === 1 ? (
            <MCAddData id={id} EncryptedID={EncryptedID} />
          ) : toggleState === 2 ? (
            <MCMonthTable id={id} EncryptedID={EncryptedID} />
          ) : (
            //  <CustomerDetails id={id} EncryptedID={EncryptedID}/>
            <ShowDiffRate id={id} />
          )}
        </div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default MCUpdate;
