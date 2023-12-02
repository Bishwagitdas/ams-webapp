import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  blackButton,
  monthShortForms,
  months,
  positiveButton,
} from "../../../components/DesignStandardize";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
const Download = () => {
  const custID_encryptID = useParams();
  const [arr, setArr] = useState([]);
  const [AWB, SetAWB] = useState("");
  const [selectedPaymentOb, setSelctedPaymentOb] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedShortMonth, setSelectedShortMonth] = useState("");
  const [Area, setArea] = useState("");
  const [Payment, setPayment] = useState("");
  const [Delivery, setDelivery] = useState("");
  const [search, setSearch] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [finalTable, setFinalTable] = useState([]);

  async function getCustomerAllInfo() {
    try {
      const response = await axios.get(
        `http://localhost:4000/maintable/getAllInfo?CustomerID=${custID_encryptID.CustomerID}`
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

  const handleDownloadPDF = () => {
    if (!selectedShortMonth) {
      alert("Please select a month first");
      return;
    }

    const pdfContent = document.getElementById("pdf-content");
    console.log(pdfContent);
    html2canvas(pdfContent, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 205;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Import_Bill_${companyName}_${selectedMonth}.pdf`);
    });
  };

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

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    filteredData.forEach((el) => {
      if(el.TOTAL === null) el.TOTAL = 0;
      total += parseFloat(el.TOTAL);
    });
    return total;
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
  console.log(arr);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-2">
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

        <div className="flex flex-row gap-2">
          <button onClick={filterData} className={`${blackButton}`}>
            Search
          </button>
          <button onClick={handleDownloadPDF} className={`${positiveButton}`}>
            Download PDF
          </button>
        </div>
      </div>
      {selectedMonth !== "" && (
        <div id="pdf-content" className="flex flex-col gap-3 border">
          {/* Headline for Table */}
          <div className="uppercase text-center text-gray-900">
            import bill of
            <br />
            {selectedMonth}, 2023
            <br />
            <p className="underline">{companyName}</p>
          </div>

          {/* Table for Specific Month */}
          <div className="max-w-96 overflow-auto">
            <table className="table text-center overflow-x-auto">
              <thead>
                <tr className="">
                  <th className="sticky left-0 z-10 bg-white">Index</th>

                  <th>Date</th>
                  <th>AWB</th>
                  <th>WGT</th>
                  <th>DELIVERY ITEM</th>
                  <th>FRCOST$</th>
                  <th>FRCOSTBDT</th>
                  <th>CUSTOM</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {finalTable.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td className="sticky left-0 z-10 bg-white">{i + 1}</td>

                      <td>{el.DATE}</td>
                      <td>{el.AWB}</td>
                      <td>{el.WGT}</td>
                      <td>{el["DELIVERY ITEM"]}</td>
                      <td>{el.FRCOST$}</td>
                      <td>{el.FRCOSTBDT}</td>
                      <td>{el.CUSTOM}</td>
                      <td>{el.TOTAL}</td>
                    </tr>
                  );
                })}

                {/* To show the total amount */}
                {filteredData.length > 0 && (
                  <tr>
                    <td colSpan="12" className="text-right">
                      Total Amount: <strong>{calculateTotal()}</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Download;
