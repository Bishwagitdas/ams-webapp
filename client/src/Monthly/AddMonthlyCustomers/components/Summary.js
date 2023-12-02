import React, { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import crypto from "crypto-browserify";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Summary = ({
  // number,
  username,
  inseeTable,
  // paymentType,
  rateRows,
  EncryptedID,
  CustomerID
}) => {
  const navigate = useNavigate();
  console.log(CustomerID);
  const [finalRows, setFinalRows] = useState([
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
  ]);
   
  // console.log("EncryptedID", EncryptedID);
  const hashusername = crypto.createHash("sha256").update(username).digest("hex");
  console.log(hashusername);
  useEffect(() => {
    const updatedFinalRows = [
      ...rateRows.map(({ weightTo, rate }) => ({ weightTo, rate })),
      ...finalRows.slice(rateRows.length),
    ];
    setFinalRows(updatedFinalRows);
  }, [rateRows]);

  // console.log("final rows:", finalRows);

  const customerReg = async (username) => {
    const data = {
      COMPANY: username,
      EncryptedID: crypto.createHash("sha256").update(username).digest("hex"),
    };
    console.log("data", data);
    try {
      const response = await axios.post(
        "http://localhost:4000/customReg/mCustomerReg",
        data
      );
      console.log(response.data);

      await setDiffRateID(data.EncryptedID); // taking ecnrptID to get custID first, use that as reference in diffrate
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let custID; // globally taken cause it will be called on two different methods for single purpose
  async function setDiffRateID(encryptedID) {
    // Define Express.js API endpoint
    custID = await getCustomerID(encryptedID);
    const data = {
      customerID: custID,
      tillW1: finalRows[0].weightTo,
      val1: finalRows[0].rate,
      tillW2: finalRows[1].weightTo,
      val2: finalRows[1].rate,
      tillW3: finalRows[2].weightTo,
      val3: finalRows[2].rate,
      tillW4: finalRows[3].weightTo,
      val4: finalRows[3].rate,
      tillW5: finalRows[4].weightTo,
      val5: finalRows[4].rate,
    //  customerID: custID,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/prepaid/diffRate",
        data
      );
      console.log("diffrate:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getCustomerID(encryptedID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/getCustomerID?EncryptedID=${encryptedID}`
      );
      console.log("custID inside:", response.data.customerID);
      return response.data.customerID;
    } catch (err) {
      console.error(err);
    }
  }
  // async function getCustomerID() {
  //   const hash = crypto.createHash("sha256").update(username).digest("hex");
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/prepaid/getCustomerID?EncryptedID=${EncryptedID}`
  //     );
  //     console.log(response.data.customerID);
  //     custID = response.data.customerID;

  //     console.log("custID:", custID);
  //     differentRate();
  //     // setCustID(response.data.customerID);
  //     // setCustID(response.data.customerID);
  //     //  console.log(setCustID(response.customerID));
  //     //  console.log(custID);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function differentRate() {
    // Define Express.js API endpoint
    const apiUrl = `http://localhost:4000/prepaid/diffRate/${CustomerID}`; // Update the URL

    // Make a POST request to Express.js API
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tillW1: finalRows[0].weightTo,
        val1: finalRows[0].rate,
        tillW2: finalRows[1].weightTo,
        val2: finalRows[1].rate,
        tillW3: finalRows[2].weightTo,
        val3: finalRows[2].rate,
        tillW4: finalRows[3].weightTo,
        val4: finalRows[3].rate,
        tillW5: finalRows[4].weightTo,
        val5: finalRows[4].rate,
        // customerID: custID,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          console.log("Data sent successfully");
          toast.success("Registration successful!");
          window.location.reload();
        } else {
          // Handle the error
          console.error("Failed to send data");
          toast.error("Registration failed. Email must be unique.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function totalRegister(ev) {
    ev.preventDefault();
   await customerReg(username);
  //  await getCustomerID();
  }
  // useEffect(()=>{
  //    totalRegister()
  // },[])

  return (
    <div className="m-auto card w-max shadow-lg px-3">
      <div className="card-body">
        <p className="card-title">Customer Details</p>
        <div className="flex flex-col gap-1 my-3">
          <p>
            <strong>Customer Name:{CustomerID}</strong> {username}
          </p>
          <p>{/* <strong>Customer Number:</strong> {number} */}</p>
          <p>{/* <strong>Payment Type:</strong> {paymentType} */}</p>
          <p className="card-title mt-4">Rate Rows</p>
          <table className="table table-compact">
            <thead>
              <tr>
                <th>Row</th>
                <th>Weight From</th>
                <th>Weight Till</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rateRows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {index === 0
                      ? row.weightFrom
                      : parseFloat(rateRows[index - 1].weightTo) + 0.1}
                  </td>

                  <td>{row.weightTo}</td>
                  <td>{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {inseeTable===true?<button
          onClick={totalRegister}
          className="rounded-md w-max m-auto py-1 px-3 text-lg text-white bg-green-500 hover:bg-green-700"
        >
          Add
        </button>:<button
          onClick={differentRate}
          className="rounded-md w-max m-auto py-1 px-3 text-lg text-white bg-green-500 hover:bg-green-700"
        >
          Submit
        </button>}
      </div>
    </div>
  );
};

export default Summary;
