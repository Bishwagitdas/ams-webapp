import React, { useState } from "react";
import LeftPanel from "../../components/LeftPanel";
import TopNavbar from "../../components/TopNavbar";
import Datepicker from "react-tailwindcss-datepicker";
const MCBillGenerate = () => {
  const [toggleState, setToggleState] = useState(1);
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <>
      <TopNavbar />
      <LeftPanel />

      <div className="lg:ml-72 bg-gray-100 min-h-screen pt-14 font-[Poppins]">
        <div className="flex flex-col gap-6 h-full bg-white m-2 p-5 md:m-12 md:p-12">
          <p className="text-[28px] font-extrabold pb-10 border-b-2 border-gray-200">
            [Show Monthly Customer Name]
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
              Specific Bill
            </a>
            <a
              className={`tab tab-bordered ${
                toggleState === 2 && "tab-active"
              }`}
              onClick={() => {
                changeTab(2);
              }}
            >
              Monthly Bill
            </a>
          </div>

          {toggleState === 1 ? (
            <div className="w-64">
              <Datepicker
                useRange={false}
                primaryColor={"blue"}
                value={value}
                onChange={handleValueChange}
                showShortcuts={true}
                asSingle={true}
                displayFormat={"DD/MM/YYYY"}
                inputClassName="w-full rounded-md bg-gray-200 focus:bg-white p-2"
              />
            </div>
          ) : (
            <p>Monthly Date Bill Generate</p>
          )}
        </div>
        <div className="h-20" />
      </div>
    </>
  );
};

export default MCBillGenerate;
