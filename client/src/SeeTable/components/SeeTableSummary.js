import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  generalInput,
  generalRateInput,
  negativeButtom,
  positiveButton,
  blackLinkButton,
  months,
  monthShortForms,
} from "../../components/DesignStandardize";
import axios from "axios";
import crypto from "crypto-browserify";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import ClipLoader from "react-spinners/ClipLoader"
import { fr } from "date-fns/locale";
import { toast } from "react-toastify";
const SeeTableSummary = () => {
  let maintable = [];
  const [Maintable, setMainTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedShortMonth, setSelectedShortMonth] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [selectedPayment, setSelctedPayment] = useState("");
  // const [selectedPaymentOb, setSelctedPaymentOb] = useState("");
  // const [arr, setArr] = useState([]);
  const [Area, setAreas] = useState("");
  const [Payment, setPayment] = useState("");
  // const [AWB, SetAWB] = useState("");
  const [Delivery, setDelivery] = useState("");
  const [Search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
const [monthsearch,setMonthSearch] = useState(false);
  // const override: CSSProperties = {
  //   display: "block",
  //   margin: "0 auto",
  //   borderColor: "red",
  // };
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };
  const [rateRows, setRateRows] = useState([
    { weightFrom: 0.1, weightTo: 0, rate: 0 },
    { weightFrom: 0, weightTo: 0, rate: 0 },
  ]);
  const [checkbox,setCheckbox] = useState(false)
  const handleCheckboxChange =()=>{
    setCheckbox(!checkbox);
  }
  const [cod,setCod] = useState(0);
  const [no, setNo] = useState("");
  const [flight, setFlight] = useState("");
  const [mawb, setMawb] = useState("");
  const [awb, setAwb] = useState("");
  const [shipper, setShipper] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [person, setPerson] = useState("");
  const [number, setNumber] = useState("");
  const [area, setArea] = useState("");
  const [nop, setNop] = useState("");
  const [weight, setWeight] = useState("");
  const [spxType, setSpxType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryItem, setDeliveryItem] = useState("");
  const [volumeWeight, setVolumeWeight] = useState("");
  const [time, setTime] = useState("");
  const [receiving, setReceiving] = useState("");
  const [remarks, setRemarks] = useState("");
  const [frCost, setFrCost] = useState(0);
  const [dollarRate, setDollarRate] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [actualPaid, setActualPaid] = useState("");
  const [companyMatch, setCompanyMatch] = useState(0 | 1);
  const [finalUser, setFinalUser] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [valueDate, setValueDate] = useState([
    { startDate: null, endDate: null },
  ]);
  // const getMonths = async()=>{
  //   try {
  //     const response = await axios.get(`localhost:4000/`)
  //   } catch (error) {
      
  //   }
  // }
  const filterData = async () => {
    const filteredData = await Maintable.filter((data) => {
      const areaCondition =
        Area !== "" ? data.AREA === Area.toUpperCase() : true;
      // const AirwayBill = AWB !== "" ? data.AWB === AWB : true;
      const Month =
        selectedMonth !== "" ? data.MONTH === selectedShortMonth : true;
      const paymentCondition =
        Payment !== "" ? (data["TYPE OF PAYMENT"].toUpperCase()||data["TYPE OF PAYMENT"].toLowerCase()) === ((Payment.toUpperCase()||Payment.toLowerCase())) : true;
      const deliveryCondition =
        Delivery !== "" ? (data["DELIVERY ITEM"].toUpperCase()||data["DELIVERY ITEM"].toLowerCase()) === (Delivery.toUpperCase()||Delivery.toLowerCase()) : true;
      // Month &&
      console.log("Data Month:", data.MONTH);
      console.log("Selected Month:", selectedShortMonth);
      console.log("Month Condition:", Month);
      // console.log("Selected Payment:", selectedPaymentOb);
      console.log("Payment COndition", paymentCondition);
      return (
        Month &&
        areaCondition &&
        // AirwayBill &&
        paymentCondition &&
        deliveryCondition
      );
    });
    // const
    console.log(filteredData);
    setFilteredData(filteredData);
    // setMonthSearch(!monthsearch);
    setSearch(!Search);
    setMonthSearch(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  const handleSelect = (e) => {
    const selected = e.target.value;
    setSelectedMonth(selected);
    setSelectedShortMonth(monthShortForms[selected]);
    // setSelctedPayment(selected);
  };
  const handleDateChange = (newDate) => {
    setValueDate(newDate);
  };
  const formattedDate = valueDate.startDate
    ? format(new Date(valueDate.startDate), "dd.MM.yyyy")
    : null;

  // 16.11.2023 to Nov conversion
  const month = valueDate.startDate
    ? format(new Date(valueDate.startDate), "MMM")
    : null;
  // handle date end

  const handleFrCostChange = (e) => {
    const newFrCost = e.target.value;
    if (!isNaN(newFrCost) && newFrCost >= 0) {
      setFrCost(newFrCost);
    } else {
      console.error("Fr. cost must be a number greater than or equal to 0");
    }
  };

  //   Calculate frcost in BDT
  const dollarrates=()=>{
    let frCostInBDT;
    if(checkbox)
    {
     return frCostInBDT = (frCost * dollarRate) +  (0.1*frCost*dollarRate);
    }else{
      return frCostInBDT = frCost * dollarRate;
      ;
    }
  };
  
  const frCostInBDT = dollarrates(cod);
  

  //   Calculate round weight
  const roundWeight = Math.ceil(weight);

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
  // Diff rate section
  const [finalRows, setFinalRows] = useState([
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
    { weightTo: 0, rate: 0 },
  ]);
  useEffect(() => {
    const updatedFinalRows = [
      ...rateRows.map(({ weightTo, rate }) => ({ weightTo, rate })),
      ...finalRows.slice(rateRows.length),
    ];
    setFinalRows(updatedFinalRows);
  }, [rateRows]);

  const summary = [
    { title: "No.", value: no },
    { title: "Date", value: formattedDate },
    { title: "Flight", value: flight },
    { title: "MAWB", value: mawb },
    { title: "AWB", value: awb },
    { title: "Shipper", value: shipper },
    { title: "Company name", value: customerName },
    { title: "Contact Person", value: person },
    { title: "Contact Number", value: number },
    { title: "Area", value: area },
    { title: "NOP", value: nop },
    { title: "WGT", value: weight },
    { title: "SPX type", value: spxType },
    { title: "Type of Payment", value: paymentMethod },
    { title: "Delivery item", value: deliveryItem },
    { title: "Volumw weight", value: volumeWeight },
    { title: "Time", value: time },
    { title: "Receiving Person", value: receiving },
    { title: "Remarks", value: remarks },
    { title: "Round Weight", value: roundWeight },
    { title: "Fr. Cost ($)", value: frCost },
    { title: "Fr. Cost (TK)", value: frCostInBDT },
    { title: "Custom", value: "" },
    { title: "Total", value: "" },
    { title: "Paid Date", value: paidDate },
    { title: "Actual Date", value: actualPaid },
  ];

  // globals for params
  let price;
  let totalPrice,
    customPrice,
    locationCost = 0;
  // const [maintable, setMainTable] = useState([]); // being used for fetching all information

  // Get ALL info based of MONTH & YEAR
  async function getAllInfoMonth(){
    let response = '';
    try{
      response = await axios.get(
        `http://localhost:4000/maintable/getAllInfoMonth?Month=${selectedShortMonth}`
      );
      console.log('Selected Short Month', response.data);
      setMainTable(response.data.rows);
      setMonthSearch(true);
      
    } catch(err){
      console.error(err);
      response = null;
      if(selectedMonth){

        toast.error("No data recorded this month");
      }
    }
  }
  // let maintable = [];
  // async function getAllInfo() {
  //   // USE THIS METHOD TO FETCH ALL INFO ON MAIN TABLE
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4000/maintable/getMainTable`
  //     );
  //     console.log(response.data);
  //     setMainTable(response.data);
  //     maintable = response.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  useEffect(() => {
    // getAllInfo();
    getAllInfoMonth();
    //  setLoading(true);
  }, []);
  function isCompanyMatch(maintable) {
    for (const innerArray of maintable) {
      if (innerArray.COMPANY === customerName) {
        setCompanyMatch(0);
        return true; // Match found
      }
    }
    //bebosta
    setCompanyMatch(1);
    return false;
  }

  let result = false;

  async function getCustomerID(encryptedID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/getCustomerID?EncryptedID=${encryptedID}`
      );
      return response.data.customerID;
    } catch (err) {
      console.error(err);
    }
  }
  const customerReg = async (username) => {
    const data = {
      COMPANY: username,
      EncryptedID: crypto.createHash("sha256").update(username).digest("hex"),
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/customReg/mCustomerReg",
        data
      );

      await differentRate(data.EncryptedID); // taking ecnrptID to get custID first, use that as reference in diffrate
    } catch (error) {
      console.error("Error:", error);
    }
  };
  let custID; // globally taken cause it will be called on two different methods for single purpose

  async function differentRate(encryptedID) {
    // Define Express.js API endpoint
    custID = await getCustomerID(encryptedID);
    const apiUrl = "http://localhost:4000/prepaid/diffRate"; // Update the URL

    // Make a POST request to Express.js API
    await fetch(apiUrl, {
      method: "POST",
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
        customerID: custID,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
        } else {
          // Handle the error
          console.error("Failed to send data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  async function getPrice(weight, price) {
    customPrice = weight * price;
    return customPrice;
  }
  async function getDiffrateID(custID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/getDiffRateID/getDiffRateID?customerID=${custID}`
      );
      return response.data.DiffRateID;
    } catch (error) {}
  }
  const uploadMainTable = async (customerName) => {
    const encryptedID = crypto
      .createHash("sha256")
      .update(customerName)
      .digest("hex");
    custID = await getCustomerID(encryptedID);
    await getDiffRateArr(custID);
    const diffRate = await getDiffrateID(custID);
    const data = {
      CustomerID: custID,
      DiffRateID: diffRate,
      NO: no,
      DATE: formattedDate,
      MONTH: month,
      FLIGHT: flight,
      MAWB: mawb,
      AWB: awb,
      SHIPPER: shipper,
      COMPANY: customerName,
      PERSON: person,
      NUMBER: number,
      AREA: area,
      NOP: nop,
      WGT: weight,
      SPXTYPE: spxType,
      PAYMENTMETH: paymentMethod,
      DELIVERYITEM: deliveryItem,
      VOLUMEWEIGHT: volumeWeight,
      TIME: time,
      RECEIVING: receiving,
      REMARKS: remarks,
      ROUNDWGT: roundWeight,
      FrCost$: frCost,
      FrCostBDT: frCostInBDT, // convert it from USD (rate will be given by user)
      CUSTOM: customPrice,
      TOTAL: totalPrice,
      PAIDDATE: paidDate,
      ACTUALPAID: actualPaid,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/table/tableinsertion",
        data
      );
      window.location.reload();
    } catch (err) {
      console.error("error:", err);
    }
  };
  async function getPrice(weight, price) {
    customPrice = weight * price;
    return customPrice;
  }

  async function getDiffRateArr(CustomerID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/diffRateArr?CustomerID=${CustomerID}`
      );
      await sortAndSearch(response.data, roundWeight);

      await getPrice(roundWeight, price); // to find CUSTOM
      // setCustomPrice(getCustPrice);

      totalPrice = customPrice + frCostInBDT + locationCost;
      // setTotalPrice(total);

      // prepaidUpdate();
    } catch (err) {
      console.error(err);
    }
  }
  async function sortAndSearch(arr, roundWeight) {
    for (let i = 0; i < arr[0].length; i++) {
      if (roundWeight <= arr[0][i]) {
        const calculatedPrice = arr[1][i];
        price = calculatedPrice;
        return;
      } else if (arr[0][i] === 0) {
        const calculatedPrice = arr[1][i - 1];
        price = calculatedPrice;
        return;
      }
    }
    // If ROUNDWGT is greater than all values in arr[0], return the last value in arr[1].
    const calculatedPrice = arr[1][arr[1].length - 1];
    price = calculatedPrice;
  }
  async function oneClickForAllMethods() {
    // await getAllInfo();
    const result = isCompanyMatch(maintable);
  }
  const searchCustomer = async (e) => {
    e.preventDefault();
    await getAllInfoMonth();
    result = isCompanyMatch(maintable);
    setSearchClick(true);
  };

  const handleEvent = (e) => {
    e.preventDefault();
    customerReg(customerName);
  };

  const handleAddData = (e) => {
    e.preventDefault();
    uploadMainTable(customerName);
    // window.location.reload();
  };
  return (
    <>
      {/* Tabs */}
      <div className="tabs text-[28px]">
        <p
          className={`tab tab-bordered ${toggleState === 1 && "tab-active"}`}
          onClick={() => {
            changeTab(1);
          }}
        >
          Add Data
        </p>
        <p
          className={`tab tab-bordered ${toggleState === 2 && "tab-active"}`}
          onClick={() => {
            changeTab(2);
          }}
        >
          See Table
        </p>
      </div>

      {toggleState === 1 ? (
        <>
          <div className="flex flex-row flex-wrap gap-10">
            <div className="flex flex-col gap-3">
              {/* Search username exist or not */}
              <div className="w-64">
                <label className="label">Company Name</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="bg-blue-100"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <button
                    onClick={(e) => {
                      searchCustomer(e);
                    }}
                    className={`${positiveButton} m-auto`}
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Company does not exist */}
              {companyMatch === 1 && searchClick && (
                <form
                  onSubmit={handleEvent}
                  className="flex flex-row flex-wrap gap-3"
                >
                  <div className="flex flex-col gap-3">
                    {/* Comapny name input */}
                    <div className="w-64">
                      <label className="label">Company Name</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Type here"
                          className={`${generalInput}`}
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Diff rate */}
                    <p className="text-[#9FA1A6] text-sm">
                      Set rate for different range
                    </p>
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
                                  : parseFloat(rateRows[index - 1].weightTo) +
                                    0.1
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
                                weightToChange(
                                  index,
                                  "weightTo",
                                  e.target.value
                                )
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
                          <button
                            onClick={handleAddRow}
                            className={`${positiveButton}`}
                          >
                            <span className="m-auto text-sm text-white">
                              <AddIcon style={{ fontSize: 15 }} />
                              Add range
                            </span>
                          </button>
                        )}
                        {rateRows.length > 2 && (
                          <button
                            onClick={handleDeleteRow}
                            className={`${negativeButtom}`}
                          >
                            <span className="m-auto text-sm text-white">
                              <RemoveIcon style={{ fontSize: 15 }} />
                              Delete range
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="rounded-md w-max m-auto py-1 px-3 text-lg text-white bg-green-500 hover:bg-green-700">
                    New Customer
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Input fields */}
          <form
            onSubmit= {handleAddData}
            // {dollors}
            
            className="flex flex-row flex-wrap gap-10"
          >
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-10">
              {/* NO */}
              <div className="w-64">
                <label className="label">NO.</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={no}
                  onChange={(e) => setNo(e.target.value)}
                />
              </div>

              {/* Flight */}
              <div className="w-64">
                <label className="label">Flight</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={flight}
                  onChange={(e) => setFlight(e.target.value)}
                />
              </div>

              {/* Date */}
              <div className="w-64">
                <label className="label">Date</label>
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

              {/* MAWB */}
              <div className="w-64">
                <label className="label">MAWB</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={mawb}
                  onChange={(e) => setMawb(e.target.value)}
                />
              </div>

              {/* AWB */}
              <div className="w-64">
                <label className="label">AWB</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={awb}
                  onChange={(e) => setAwb(e.target.value)}
                />
              </div>

              {/* Shipper */}
              <div className="w-64">
                <label className="label">Shipper</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={shipper}
                  onChange={(e) => setShipper(e.target.value)}
                />
              </div>

              {/* Person */}
              <div className="w-64">
                <label className="label">Person</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />
              </div>

              {/* Number */}
              <div className="w-64">
                <label className="label">Number</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              {/* Area */}
              <div className="w-64">
                <label className="label">Area</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              {/* NOP */}
              <div className="w-64">
                <label className="label">NOP</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={nop}
                  onChange={(e) => setNop(e.target.value)}
                />
              </div>

              {/* Weight */}
              <div className="w-64">
                <label className="label">Weight</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* SPX type */}
              <div className="w-64">
                <label className="label">SPX type</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={spxType}
                  onChange={(e) => setSpxType(e.target.value)}
                />
              </div>

              {/* Payment method */}
              <div className="w-64">
                <label className="label">Payment method</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              {/* Delivery Item */}
              <div className="w-64">
                <label className="label">Delivery Item</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={deliveryItem}
                  onChange={(e) => setDeliveryItem(e.target.value)}
                />
              </div>

              {/* Volume weight */}
              <div className="w-64">
                <label className="label">Volume Weight</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={volumeWeight}
                  onChange={(e) => setVolumeWeight(e.target.value)}
                />
              </div>

              {/* Time */}
              <div className="w-64">
                <label className="label">Time</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {/* Receiving */}
              <div className="w-64">
                <label className="label">Receiving</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={receiving}
                  onChange={(e) => setReceiving(e.target.value)}
                />
              </div>

              {/* Remarks */}
              <div className="w-64">
                <label className="label">Remarks</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              {/* Convertion rate from dollar to bdt */}
              <div className="w-64">
                <label className="label">Current Dollar Rate</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={dollarRate}
                  onChange={(e) => setDollarRate(e.target.value)}
                />
              </div>
              {/* Fr cost in dollar */}
              <div className="w-64">
                <label className="label">Fr. cost ($)</label>
                {!dollarRate?<input
                  type="number"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={frCost}
                  onChange={handleFrCostChange}
                  readOnly
                />:<input
                type="number"
                placeholder="Type here"
                className={`${generalInput}`}
                value={frCost}
                onChange={handleFrCostChange}
              />}
              </div>
              {/* add checkbox */}
            
      
              {/* {checkbox && <div className="w-64">
                <label className="label">COD</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
              </div>} */}

              {/* Paid date */}
              <div className="w-64">
                <label className="label">Paid Date</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={paidDate}
                  onChange={(e) => setPaidDate(e.target.value)}
                />
              </div>

              {/* Actual Paid*/}
              <div className="w-64">
                <label className="label">Actual Paid</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className={`${generalInput}`}
                  value={actualPaid}
                  onChange={(e) => setActualPaid(e.target.value)}
                />
              </div>
              <div>
                <label className="label w-max">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm md:checkbox-md"
                    onChange={handleCheckboxChange}
                  />
                  <span className="label-text ml-2">Standardized COD</span>
                </label>
              </div>
            </div>

            {/* Summary Card */}
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

                <button className={`${positiveButton} m-auto`}>Add</button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-2">
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
            <button className={`${blackLinkButton}`} onClick={getAllInfoMonth}>
              {" "}
              Search
            </button> 
            </div>

         {monthsearch?
         <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Area"
              className="input input-bordered w-[180px] max-w-xs"
              value={Area}
              onChange={(e) => setAreas(e.target.value)}
            />

            <input
              // placeholder="Emnei"
              type="text"
              placeholder="Payment"
              value={Payment}
              onChange={(e) => setPayment(e.target.value)}
              className="input input-bordered w-[180px] max-w-xs"
            />
            {/* <select
        className="select select-bordered select-sm w-40 bg-gray-100 focus:bg-white"
        onChange={handleSelectPayment}
        value={selectedPayment}
      >
        <option value="" disabled>
          Select a Payment Method
        </option>
        {Payments.map((Payment, index) => (
          <option key={index} value={Payment}>
            {Payment}
          </option>
        ))}
      </select> */}
            {Payment && (
              <input
                placeholder="Delivery"
                type="text"
                value={Delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="input input-bordered w-[180px] max-w-xs"
              />
            )}
            <button className={`${blackLinkButton}`} onClick={filterData}>
              {" "}
              Search
            </button> 
           
         </div>:<></>
         }
       
        </div>
          <div className="max-h-96 max-w-72 overflow-auto">
            {loading ? (
              <>
                {/*  */}
                <p className="font-Poppins">
                  Please Wait for the data to render.......{" "}
                  <ClipLoader
                    color="##ffffff"
                    loading={loading}
                    // cssOverride={override}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </p>
              </>
            ) : (
              <table className="table text-center overflow-x-auto">
                {/* head */}
                <thead>
                  <tr className="sticky top-0 bg-white">
                    
                    <th>Serial No.</th>
                    <th>No.</th>
                    <th>DATE</th>
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
                    <th>VOLUME OF WEIGHT</th>
                    <th>DATE OF DELIVERY</th>
                    <th>TIME</th>
                    <th>RECEIVING PERSON</th>
                    <th>REMARKS</th>
                    <th>ROUND WEIGHT</th>
                    <th>FrCost$</th>
                    <th>FrCostTK</th>
                    <th>CUSTOM</th>
                    <th>TOTAL</th>
                    <th>PAID DATE</th>
                    <th>ACTUAL PAID</th>
                  </tr>
                </thead>
                <tbody>
                {monthsearch &&
                    Maintable.map((el, i) => {
                      return (
                        <tr className="">
                          <td className="">{i + 1}</td>
                          <td>{el.NO}</td>
                          <td className="">{el.DATE}</td>
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
                          <td className="">{el["DATE OF DELIVERY"]}</td>
                          <td className="">{el.TIME}</td>
                          <td className="">{el["RECEIVING PERSON"]}</td>
                          <td className="">{el.REMARKS}</td>
                          <td className="">{el["ROUND WEIGHT"]}</td>
                          <td className="">{el.FRCOST$}</td>
                          <td className="">{el.FRCOSTBDT}</td>
                          <td className="">{el.CUSTOM}</td>
                          <td className="">{el.TOTAL}</td>
                          <td className="">{el["PAID DATE"]}</td>
                          <td className="">{el["ACTUAL DATE"]}</td>
                        </tr>
                      );
                    })}
                {!monthsearch &&
                    filteredData.map((el, i) => {
                      return (
                        <tr className="">
                          {/* <td className="sticky left-0 z-10 bg-white">{i + 1}</td> */}
                          <td>{el.NO}</td>
                          <td className="">{el.DATE}</td>
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
                          <td className="">{el["DATE OF DELIVERY"]}</td>
                          <td className="">{el.TIME}</td>
                          <td className="">{el["RECEIVING PERSON"]}</td>
                          <td className="">{el.REMARKS}</td>
                          <td className="">{el["ROUND WEIGHT"]}</td>
                          <td className="">{el.FRCOST$}</td>
                          <td className="">{el.FRCOSTBDT}</td>
                          <td className="">{el.CUSTOM}</td>
                          <td className="">{el.TOTAL}</td>
                          <td className="">{el["PAID DATE"]}</td>
                          <td className="">{el["ACTUAL DATE"]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SeeTableSummary;
