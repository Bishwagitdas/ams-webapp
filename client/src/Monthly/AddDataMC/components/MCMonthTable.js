import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  months,
  monthShortForms,
  positiveButton,
  blackButton,
} from "../../../components/DesignStandardize";
import { Link, useParams } from "react-router-dom";
const MCMonthTable = (id) => {
  console.log(id);
  const customID = id.id.CustomerID;
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedShortMonth, setSelectedShortMonth] = useState("");
  const EncryptedID = useParams();
  const [selectedPaymentOb, setSelctedPaymentOb] = useState("");
  const [arr, setArr] = useState([]);
  const [Area, setArea] = useState("");
  const [Payment, setPayment] = useState("");
  const [AWB, SetAWB] = useState("");
  const [Delivery, setDelivery] = useState("");
  const [search, setSearch] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [finalTable, setFinalTable] = useState([]);

  // async function getCustomerID(encryptedID) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/prepaid/getCustomerID?EncryptedID=${encryptedID}`
  //     );
  //     console.log('custID inside:', response.data.customerID);
  //     return response.data.customerID;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function getCustomerAllInfo() {
    try {
      const response = await axios.get(
        `http://localhost:4000/maintable/getAllInfo?CustomerID=${customID}`
      );
      console.log("response: ", response);
      setArr(response.data.rows);
      console.log("arr:", arr);
    } catch (err) {
      console.error(err);
    }
  }
  const handleSelect = (e) => {
    setSelectedMonth("");
    const selected = e.target.value;
    setSelectedMonth(selected);
    setSelectedShortMonth(monthShortForms[selected]);
  };

  useEffect(() => {
    getCustomerAllInfo();
  }, []);

  const filterData = async () => {
    const filteredData = await arr.filter((data) => {
      const areaCondition =
        Area !== "" ? data.AREA === Area.toUpperCase() : true;
      const AirwayBill = AWB !== "" ? data.AWB === AWB : true;
      const Month =
        selectedMonth !== "" ? data.MONTH === selectedShortMonth : true;
      const paymentCondition =
        selectedPaymentOb !== ""
          ? data["TYPE OF PAYMENT"] === selectedPaymentOb
          : true;
      const deliveryCondition =
        Delivery !== "" ? data["DELIVERY ITEM"] === Delivery : true;
      console.log("Data Month:", data.MONTH);
      console.log("Selected Month:", selectedShortMonth);
      console.log("Month Condition:", Month);
      console.log("Selected Payment:", selectedPaymentOb);
      console.log("Payment COndition", paymentCondition);
      setCompanyName(data.COMPANY);
      return (
        Month &&
        areaCondition &&
        AirwayBill &&
        paymentCondition &&
        deliveryCondition
      );
    });
    console.log(filteredData);
    setFilteredData(filteredData);
    setSearch(1);
  };

  useEffect(() => {
    if (search === 0) {
      setFinalTable(arr);
    } else {
      setFinalTable(filteredData);
    }
  }, [search, arr, filteredData]);

  // Call the filterData function whenever the 'Area' state changes
  useEffect(() => {
    filterData();
  }, [Area, arr]);

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    filteredData.forEach((el) => {
      total += parseFloat(el.TOTAL);
    });
    return total;
  };

  return (
    <>
      {/* Select Month */}
      <div className="flex flex-row gap-2">
        <select
          className="select select-bordered select-sm w-[180px] h-[48px] bg-gray-100 focus:bg-white"
          onChange={handleSelect}
          value={selectedMonth}
        >
          <option value="" disabled>
            Select a month
          </option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>

        {selectedMonth !== "" && (
          <>
            <input
              type="text"
              placeholder="Area"
              className="input input-bordered w-[180px] max-w-xs"
              value={Area}
              onChange={(e) => setArea(e.target.value)}
            />

            <input
              type="text"
              placeholder="Payment"
              value={Payment}
              onChange={(e) => setPayment(e.target.value)}
              className="input input-bordered w-[180px] max-w-xs"
            />
          </>
        )}

        {Payment && (
          <input
            placeholder="Delivery"
            type="text"
            value={Delivery}
            onChange={(e) => setDelivery(e.target.value)}
            className="input input-bordered w-[180px] max-w-xs"
          />
        )}
      </div>
      <div className="flex gap-3 mr-auto">
        <button onClick={filterData} className={`${blackButton}`}>
          Search
        </button>

        <Link
          className={`${positiveButton}`}
          target="_blank"
          to={`/download/${customID}/${EncryptedID.Name}`}
        >
          To Download
        </Link>
      </div>

      {selectedMonth !== "" && (
        <div id="pdf-content" className="flex flex-col gap-3 border">
          {/* Headline for Table */}
          <div className="uppercase text-center text-gray-900">
            import bill of
            <br />
            {selectedMonth},2023
            <br />
            <p className="underline">{companyName}</p>
          </div>

          {/* Table for Specific Month */}
          <div className="max-h-96 max-w-96 overflow-auto">
            <table className="table text-center overflow-auto">
              <thead>
                <tr className="">
                  <th className="sticky left-0 z-10 bg-white">Index</th>
                  <th>NO.</th>
                  <th>Date</th>
                  <th>FLIGHT</th>
                  <th>MAWB</th>
                  <th>AWB</th>
                  <th>SHIPPER</th>
                  <th>COMPANY</th>
                  <th>CONTACT PERSON</th>
                  <th>CONTACT NUMBER</th>
                  <th>AREA</th>
                  <th>NOP</th>
                  <th>WGT</th>
                  <th>SPX TYPE</th>
                  <th>TYPE OF PAYMENT</th>
                  <th>DELIVERY ITEM</th>
                  <th>VOLUME WEIGHT</th>
                  <th>DATE OF DELIVERY</th>
                  <th>TIME</th>
                  <th>RECEIVING PERSON</th>
                  <th>REMARKS</th>
                  <th>ROUND WEIGHT</th>
                  <th>FRCOST$</th>
                  <th>FRCOSTBDT</th>
                  <th>CUSTOM</th>
                  <th>TOTAL</th>
                  <th>PAID DATE</th>
                  <th>ACTUAL DATE</th>
                </tr>
              </thead>
              <tbody>
                {finalTable.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td className="sticky left-0 z-10 bg-white">{i + 1}</td>
                      <td>{el.NO}</td>
                      <td>{el.DATE}</td>
                      {/* <td>{el.M}</td> */}
                      <td>{el.FLIGHT}</td>
                      <td>{el.MAWB}</td>
                      <td>{el.AWB}</td>
                      <td>{el.SHIPPER}</td>
                      <td>{el.COMPANY}</td>
                      <td>{el["CONTACT PERSON"]}</td>
                      <td>{el["CONTACT NUMBER"]}</td>
                      <td>{el.AREA}</td>
                      <td>{el.NOP}</td>
                      <td>{el.WGT}</td>
                      <td>{el["SPX TYPE"]}</td>
                      <td>{el["TYPE OF PAYMENT"]}</td>
                      <td>{el["DELIVERY ITEM"]}</td>
                      <td>{el["VOLUME WEIGHT"]}</td>
                      <td>{el["DATE OF DELIVERY"]}</td>
                      <td>{el.TIME}</td>
                      <td>{el["RECEIVING PERSON"]}</td>
                      <td>{el.REMARKS}</td>
                      <td>{el["ROUND WEIGHT"]}</td>
                      <td>{el.FRCOST$}</td>
                      <td>{el.FRCOSTBDT}</td>
                      <td>{el.CUSTOM}</td>
                      <td>{el.TOTAL}</td>
                      <td>{el["PAID DATE"]}</td>
                      <td>{el["ACTUAL DATE"]}</td>
                    </tr>
                  );
                })}

                {/* To show the total amount */}
                {/* {filteredData.length > 0 && (
                  <tr>
                    <td colSpan="12" className="text-right">
                      Total Amount: <strong>{calculateTotal()}</strong>
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* </>
      )} */}
    </>
  );
};

export default MCMonthTable;
