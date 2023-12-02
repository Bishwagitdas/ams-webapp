import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MCAddDataSummary = ({
  formattedDate,
  awb,
  weight,
  item,
  frCost,
  frCostInBDT,
  contact,
  month,
  cityName,
  locationCost,
  showLocationFields,
  id,
}) => {
  const summary = [
    { title: "Date", value: formattedDate },
    { title: "AWB", value: awb },
    { title: "Weight", value: weight },
    { title: "Item", value: item },
    { title: "Fr. Cost($)", value: frCost },
    { title: "Fr. Cost(BDT)", value: frCostInBDT },
    { title: "Contact Person", value: contact },
  ];
  const allFieldsFilled = formattedDate && awb && weight > 0 && item && contact;
  const allFieldsFilledWithLocation =
    formattedDate &&
    awb &&
    weight > 0 &&
    item &&
    contact &&
    cityName &&
    locationCost;

  const tempID = id.id.CustomerID; // acquiring customerID -> Customer Table
  const [diffRateArr, setDiffRateArr] = useState([]);
  let price = 0;
  let customPrice = 0;
  let totalPrice = 0;

  let diffRID = null;
  async function prepaidUpdate() {
    const apiUrl = "http://localhost:4000/prepaid/updateDaily";

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomerID: tempID,
        DiffRateID: diffRID,
        Date: formattedDate,
        MonthName: month,
        AWB: awb,
        WGT: weight,
        Item: item,
        FRCost_US: frCost,
        FRCost_BDT: frCostInBDT,
        Location: cityName,
        Loc_Cost: locationCost,
        Custom: customPrice,
        TotalAmount: totalPrice,
        CustomerName: contact,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          console.log("Data sent successfully");
        } else {
          // Handle the error
          console.error("Failed to send data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  async function getDiffRateID() {
    try {
      const response = await axios.get(
        `http://localhost:4000/getDiffRateID/getDiffRateID?customerID=${tempID}`
      );
      diffRID = response.data.DiffRateID;
      console.log("Client diffID:", diffRID);
      await getDiffRateArr(diffRID);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPrice(weight, price) {
    customPrice = weight * price;
    console.log("customPrice in getPrice:", weight * price);
    return customPrice;
  }

  async function getDiffRateArr(diffRID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/diffRateArr?diffRateID=${diffRID}`
      );
      console.log("response data", response.data);
      setDiffRateArr(response.data);
      // console.log('getDiffRateArr',diffRateArr);
      await sortAndSearch(response.data, weight);
      console.log("sortAndSearch", price);

      await getPrice(weight, price);
      console.log("customPrice in getDiffRateArr", customPrice);
      // setCustomPrice(getCustPrice);

      totalPrice = customPrice + frCostInBDT + locationCost;
      // setTotalPrice(total);

      prepaidUpdate();
    } catch (err) {
      console.error(err);
    }
  }
  async function sortAndSearch(arr, weight) {
    for (let i = 0; i < arr[0].length; i++) {
      if (weight <= arr[0][i]) {
        const calculatedPrice = arr[1][i];
        price = calculatedPrice;
        return;
      } else if (arr[0][i] === 0) {
        const calculatedPrice = arr[1][i - 1];
        price = calculatedPrice;
        return;
      }
    }
    // If weight is greater than all values in arr[0], return the last value in arr[1].
    const calculatedPrice = arr[1][arr[1].length - 1];
    price = calculatedPrice;
  }
  useEffect(() => {
    console.log("total", totalPrice);
  }, [totalPrice]);

  async function totalRegister(ev) {
    try {
      await getDiffRateID();
      toast.success("Added");
    } catch (error) {
      toast.error("An error occurred");
    }
  }
  return (
    <div className="m-auto card w-72 shadow-lg px-3">
      <div className="card-body flex flex-col gap-3">
        <p className="card-title">Summary</p>
        {summary.map((el, i) => {
          return (
            <p key={i}>
              <strong>{el.title}:</strong> {el.value}
            </p>
          );
        })}
        {showLocationFields && (
          <>
            <p>
              <strong>City:</strong> {cityName}
            </p>
            <p>
              <strong>City cost:</strong> {locationCost}
            </p>
          </>
        )}

        {((!showLocationFields && allFieldsFilled) ||
          (showLocationFields && allFieldsFilledWithLocation)) && (
          <button
            onClick={totalRegister}
            className="rounded-md w-max m-auto py-1 px-3 text-lg text-white bg-green-500 hover:bg-green-700"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default MCAddDataSummary;
