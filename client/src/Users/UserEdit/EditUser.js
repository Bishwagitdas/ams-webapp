import React, { useState } from "react";
import LeftPanel from "../../components/LeftPanel";
import TopNavbar from "../../components/TopNavbar";
import EditUserInfo from "./components/EditUserInfo";
import EditPassword from "./components/EditPassword";
import { allFirstDiv, allSecondDiv } from "../../components/DesignStandardize";
const EditUser = () => {
  const [toggleState, setToggleState] = useState(1);
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };
  return (
    <>
      <LeftPanel />
      <TopNavbar />

      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          <p className="text-[28px] font-extrabold pb-10 border-b-2 border-gray-200">
            Update User Info
          </p>

          <div className="tabs text-[28px] m-auto">
            <a
              className={`tab tab-bordered ${
                toggleState === 1 && "tab-active"
              }`}
              onClick={() => {
                changeTab(1);
              }}
            >
              User Information
            </a>
            <a
              className={`tab tab-bordered ${
                toggleState === 2 && "tab-active"
              }`}
              onClick={() => {
                changeTab(2);
              }}
            >
              Password
            </a>
          </div>

          {toggleState === 1 ? <EditUserInfo /> : <EditPassword />}
        </div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default EditUser;
