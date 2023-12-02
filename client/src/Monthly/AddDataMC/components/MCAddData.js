import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import MCAddDataSummary from "./MCAddDataSummary";
import { generalInput } from "../../../components/DesignStandardize";

const MCAddData = (id) => {
  const [awb, setAwb] = useState("");
  const [weight, setWeight] = useState("");
  const [item, setItem] = useState("");
  const [frCost, setFrCost] = useState("");
  const [contact, setContact] = useState("");
  const [frCostInBDT, setFrCostInBDT] = useState(0);
  const [showLocationFields, setShowLocationFields] = useState(false);
  const [cityName, setCityName] = useState("");
  const [locationCost, setLocationCost] = useState("");

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    if (newWeight >= 0) {
      setWeight(newWeight);
    } else {
      console.error("Weight must be greater than to 0");
    }
  };

  const handleFrCostChange = (e) => {
    const newFrCost = e.target.value;
    if (!isNaN(newFrCost) && newFrCost >= 0) {
      setFrCost(newFrCost);
    } else {
      console.error("Fr. cost must be a number greater than or equal to 0");
    }
  };

  const handleLocationCostChange = (e) => {
    const newLocCost = e.target.value;
    if (!isNaN(newLocCost) && newLocCost >= 0) {
      setLocationCost(newLocCost);
    } else {
      console.error(
        "Location cost must be a number greater than or equal to 0"
      );
    }
  };

  const handleCheckboxChange = (e) => {
    setShowLocationFields(e.target.checked);
  };
  const [valueDate, setValueDate] = useState([
    { startDate: null, endDate: null },
  ]);

  const handleDateChange = (newDate) => {
    console.log("startDate:", newDate.startDate);
    setValueDate(newDate);
  };

  // 10-11-2023 to 10-Nov-2023 conversion
  const formattedDate = valueDate.startDate
    ? format(new Date(valueDate.startDate), "dd-MMM-yyyy")
    : null;

  // 10-Nov-2023 to Nov conversion
  const month = valueDate.startDate
    ? format(new Date(valueDate.startDate), "MMM")
    : null;

  // Dollar to BDT conversion
  useEffect(() => {
    if (frCost && !isNaN(frCost)) {
      fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then((response) => response.json())
        .then((data) => {
          const exchangeRate = data.rates.BDT;
          const convertedFrCost = parseFloat(frCost) * exchangeRate;
          const roundedFrCostInBDT = parseFloat(convertedFrCost.toFixed(2));
          setFrCostInBDT(roundedFrCostInBDT);
        })
        .catch((error) => {
          console.log("Error fetching exchange rates: ", error);
        });
    } else {
      setFrCostInBDT(0);
    }
  }, [frCost]);

  return (
    <div className="flex flex-row flex-wrap gap-10">
      {/* Input fields */}
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-10">
        {/* Date */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Date <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <Datepicker
            useRange={false}
            primaryColor={"blue"}
            value={valueDate}
            onChange={handleDateChange}
            asSingle={true}
            displayFormat={"DD/MM/YYYY"}
            inputClassName="w-full rounded-md bg-gray-200 focus:bg-white p-2"
          />
        </div>

        {/* AWB */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              AWB <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
          />
        </div>

        {/* Weight */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Weight <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            value={weight}
            onChange={handleWeightChange}
          />
        </div>

        {/* Item */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Item <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        {/* Fr Cost */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">Fr. cost($)</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            value={frCost}
            onChange={handleFrCostChange}
          />
        </div>

        {/* Contact Person */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Contact Person{" "}
              <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        {/* City and Cost */}
        {showLocationFields && (
          <>
            {/* City Name */}
            <div className="w-64">
              <label className="label">
                <span className="label-text">City Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className={`${generalInput}`}
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>

            {/* Cost */}
            <div className="w-64">
              <label className="label">
                <span className="label-text">Cost(BDT)</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className={`${generalInput}`}
                value={locationCost}
                onChange={handleLocationCostChange}
              />
            </div>
          </>
        )}

        {/* Add location or not */}
        <div>
          <label className="label w-max">
            <input
              type="checkbox"
              className="checkbox checkbox-sm md:checkbox-md"
              onChange={handleCheckboxChange}
            />
            <span className="label-text ml-2">Add Location Cost</span>
          </label>
        </div>
      </div>

      {/* Summary */}
      <MCAddDataSummary
        formattedDate={formattedDate}
        awb={awb}
        weight={Number(weight)}
        item={item}
        frCost={Number(frCost)}
        frCostInBDT={frCostInBDT}
        contact={contact}
        month={month}
        cityName={cityName}
        locationCost={Number(locationCost)}
        showLocationFields={showLocationFields}
        id={id}
      />
    </div>
  );
};

export default MCAddData;
