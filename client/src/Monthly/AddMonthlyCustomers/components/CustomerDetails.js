import React, { useState } from "react";
import Summary from "./Summary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  positiveButton,
  negativeButtom,
  generalInput,
  generalselect,
  generalRateInput,
  blackButton,
} from "../../../components/DesignStandardize";
import { useParams } from "react-router-dom";

const CustomerDetails = ({ CustomerID, EncryptedID, inSeeTable }) => {
  //const EncryptedID = useParams();
  // console.log(EncryptedID);
  const [username, setCustomerName] = useState("");
  const [number, setNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rateRows, setRateRows] = useState([
    { weightFrom: 0.1, weightTo: 0, rate: 0 },
    { weightFrom: 0, weightTo: 0, rate: 0 },
  ]);

  // change weightTo value of rateRows
  const weightToChange = (index, field, value) => {
    let parsedValue = parseFloat(value);
    parsedValue = !isNaN(parsedValue) ? Math.abs(parsedValue) : 0;
    const updatedRows = [...rateRows];
    updatedRows[index][field] = parsedValue;

    if (field === "weightTo" && index < rateRows.length - 1) {
      updatedRows[index + 1].weightFrom = value + 0.1;
    }

    setRateRows(updatedRows);
  };

  //check weightTo is in ascending order or not
  const weightToArray = rateRows.map((row) => Number(row.weightTo));
  let inOrder = false;
  for (let i = 0; i < weightToArray.length - 1; i++) {
    if (weightToArray[i] < weightToArray[i + 1]) {
      inOrder = true;
      break;
    }
  }
  //check weightTo is in ascending order or not

  // Add new row for range
  const handleAddRow = () => {
    if (rateRows.length < 5) {
      const lastRow = rateRows[rateRows.length - 1];
      const newWeightFrom = lastRow.weightTo + 0.1;
      const newRow = { weightFrom: newWeightFrom, weightTo: NaN, rate: NaN };
      setRateRows([...rateRows, newRow]);
    }
  };

  // Delete new row for range
  const handleDeleteRow = () => {
    if (rateRows.length > 2) {
      const updatedRows = [...rateRows];
      updatedRows.pop();
      setRateRows(updatedRows);
    }
  };

  const areAllRatesGreaterThanZero = rateRows.every((row) => row.rate > 0);
  // const handleDoneClick = () => {
  //   if (rateRows.length >= 2 && rateRows[1].weightTo >= rateRows[0].weightTo) {
  //     setIsModalOpen(true);
  //   }
  // };
  return (
    <>
      <div className="grid grid-cols-1 lg:flex lg:flex-col gap-6">
        <div className="form-control grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <div>{CustomerID}</div>
          <div>{EncryptedID}</div> */}
          {/* Customer Name */}
          {inSeeTable === true && (
            <div className="w-80">
              <label className="label">
                <span className="label-text">
                  Monthly Customer Name{" "}
                  <span className="font-semibold text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className={`${generalInput}`}
                value={username}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          )}

          {/* Customer Number */}
          {/* <div className="w-80">
            <label className="label">
              <span className="label-text">
                Customer Phone Number{" "}
                <span className="font-semibold text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className={`${generalInput}`}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div> */}
        </div>

        {/* Purchase type */}
        {/* <div className="form-control w-80">
          <label className="label">
            <span className="label-text">
              Is it pre-paid basis or collect basis?{" "}
              <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <select
            className={`${generalselect}`}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option selected disabled value="" className="text-[#9FA1A6]">
              Select one
            </option>
            <option value="Pre-paid">Pre-paid</option>
            <option value="Collect Basis">Collect Basis</option>
          </select>
        </div> */}
      </div>

      {/* Pre-paid type payment */}
      {/* {
      (paymentType === "Pre-paid" || paymentType === "Collect Basis") && (
         */}
      <>
        <p className="text-[#9FA1A6] text-sm">Set rate for different range</p>
        <div className="grid grid-rows-2 gap-10">
          {rateRows.map((row, index) => (
            <div className="flex flex-wrap gap-10" key={index}>
              <div className="text-black flex gap-2 items-center">
                <span>From:</span>
                <input
                  type="number"
                  value={
                    index === 0
                      ? row.weightFrom
                      : parseFloat(rateRows[index - 1].weightTo) + 0.1
                  }
                  className={`${generalRateInput}`}
                  disabled
                />
              </div>
              <div className="text-black flex gap-2 items-center">
                <span>Till:</span>
                <input
                  type="text"
                  placeholder="till"
                  value={row.weightTo}
                  onChange={(e) =>
                    weightToChange(index, "weightTo", e.target.value)
                  }
                  className={`${generalRateInput}`}
                />
                <span className="text-xs">kg</span>
              </div>
              <div className="text-black flex gap-2 items-center">
                <span>Rate:</span>
                <input
                  type="text"
                  placeholder="rate"
                  value={row.rate}
                  onChange={(e) =>
                    weightToChange(index, "rate", e.target.value)
                  }
                  className={`${generalRateInput}`}
                />
                <span className="text-xs">BDT</span>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            {rateRows.length < 5 && (
              <button onClick={handleAddRow} className={`${positiveButton}`}>
                <span className="m-auto text-sm text-white">
                  <AddIcon style={{ fontSize: 15 }} />
                  Add range
                </span>
              </button>
            )}
            {rateRows.length > 2 && (
              <button onClick={handleDeleteRow} className={`${negativeButtom}`}>
                <span className="m-auto text-sm text-white">
                  <RemoveIcon style={{ fontSize: 15 }} />
                  Delete range
                </span>
              </button>
            )}
          </div>
        </div>
      </>
      {/* )} */}

      {
        // username.trim() !== "" &&
        //   number.trim() !== "" &&

        rateRows.length >= 2 &&
          rateRows.every(
            (row) => !isNaN(row.weightTo) && areAllRatesGreaterThanZero
          ) &&
          inOrder && (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`${blackButton}`}
            >
              Done
            </button>
          )
      }

      {/* Modal */}
      {isModalOpen && areAllRatesGreaterThanZero && inOrder && (
        <Summary
          // number={number}
          username={username}
          // paymentType={paymentType}
          rateRows={rateRows}
          EncryptedID={EncryptedID}
          inSeeTable
          CustomerID={CustomerID}
        />
      )}
    </>
  );
};

export default CustomerDetails;
