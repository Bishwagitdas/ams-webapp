import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
const MCMonthTable = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <>
      <div className="w-72 ml-auto">
        <Datepicker
          value={value}
          primaryColor={"blue"}
          onChange={handleValueChange}
          showShortcuts={true}
          inputClassName="w-full rounded-md bg-gray-200 focus:bg-white p-2"
        />
      </div>
    </>
  );
};

export default MCMonthTable;
