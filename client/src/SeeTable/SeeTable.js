import React, { useEffect, useState } from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import { allFirstDiv, allSecondDiv,blackLinkButton,months,monthShortForms } from "../components/DesignStandardize";
import axios from "axios";
import crypto from "crypto-browserify";
import SeeTableFirstSection from "./components/SeeTableFirstSection";
import SeeTableInputFields from "./components/SeeTableInputFields";
import { format } from "date-fns";
import SeeTableSummary from "./components/SeeTableSummary";

const SeeTable = () => {
  // const [maintable, setMainTable] = useState([]); // being used for fetching all information
  let maintable = [];
  const [filteredData, setFilteredData] = useState([]); // being used to filter and show
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedShortMonth, setSelectedShortMonth] = useState("");
  // const EncryptedID = useParams();
  const [selectedPayment, setSelctedPayment] = useState("");
  const [selectedPaymentOb, setSelctedPaymentOb] = useState("");
  const [arr, setArr] = useState([]);
  const [Area, setAreas] = useState("");
  const [Payment, setPayment] = useState("");
  // const [AWB, SetAWB] = useState("");
  const [Delivery, setDelivery] = useState("");
  const [Search, setSearch] = useState(0);
  // const [filteredData, setFilteredData] = useState([]);
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

  const [valueDate, setValueDate] = useState([
    { startDate: null, endDate: null },
  ]);
  const handleSelect = (e) => {
    const selected = e.target.value;
    setSelectedMonth(selected);
    setSelectedShortMonth(monthShortForms[selected]);
    // setSelctedPayment(selected);
  };
  const handleDateChange = (newDate) => {
    console.log("startDate:", newDate.startDate);
    setValueDate(newDate); //2023-11-16
  };
  const formattedDate = valueDate.startDate
    ? format(new Date(valueDate.startDate), "dd-MMM-yyyy")
    : null;

  const month = valueDate.startDate
    ? format(new Date(valueDate.startDate), "MMM")
    : null;
  // handle date end

  const roundWeight = Math.ceil(weight);

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
  async function getAllInfo() {
    // USE THIS METHOD TO FETCH ALL INFO ON MAIN TABLE
    try {
      const response = await axios.get(
        `http://localhost:4000/maintable/getMainTable`
      );
      // setMainTable(response.data);
      maintable = response.data;
      console.log("maintable", maintable);
    } catch (err) {
      console.error(err);
    }
  }
  // useEffect(() => {
  //   getAllInfo();
  // })
  // getAllInfo();
  // const filterData = async () => {
  //   const filteredData = await arr.filter((data) => {
  //     const areaCondition =
  //       Area !== "" ? data.AREA === Area.toUpperCase() : true;
  //     const AirwayBill = AWB !== "" ? data.AWB === AWB : true;
  //     const Month =
  //       selectedMonth !== "" ? data.MONTH === selectedShortMonth : true;
  //     const paymentCondition =
  //       selectedPaymentOb !== ""
  //         ? data["TYPE OF PAYMENT"] === selectedPaymentOb
  //         : true;
  //     const deliveryCondition =
  //       Delivery !== "" ? data["DELIVERY ITEM"] === Delivery : true;
  //     // Month &&
  //     console.log("Data Month:", data.MONTH);
  //     console.log("Selected Month:", selectedShortMonth);
  //     console.log("Month Condition:", Month);
  //     console.log("Selected Payment:", selectedPaymentOb);
  //     console.log("Payment COndition", paymentCondition);
  //     return (
  //       Month &&
  //       areaCondition &&
  //       AirwayBill &&
  //       paymentCondition &&
  //       deliveryCondition
  //     );
  //   });
  //   // const
  //   console.log(filteredData);
  //   setFilteredData(filteredData);
  //   setSearch(1);
  // };
  async function getCustomerAllInfo(username) {
    // IF NEEDED TO FETCH INFORMATION OF ONE CUSTOMER (FILTRATION PURPOSES)
    if (username === undefined) {
      return null;
    }
    const encryptedID = crypto
      .createHash("sha256")
      .update(username)
      .digest("hex");
    const getID = getCustomerID(encryptedID);

    try {
      const response = await axios.get(
        `http://localhost:4000/maintable/getAllInfo?CustomerID=${getID}`
      );
      console.log("response: ", response);
    } catch (err) {
      console.error(err);
    }
  }

  // INPUT BASIS INSERTION OF CUSTOMER, DIFFRATE & MAIN TABLE
  let price;
  let totalPrice,
    customPrice,
    frCostInBDT,
    locationCost = 0;
  let diffRateArr = [];

  frCostInBDT = frCost * dollarRate;

  // FOR MAIN TABLE -> VARIABLES

  let username = customerName;

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
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/prepaid/diffID",
        data
      );
      console.log("diffrate:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //ADD CONDITION if (weight > 0) {
  //   uploadMainTable
  // } else {
  //   modifiedMainTable()
  // }
  const uploadMainTable = async (username) => {
    const encryptedID = crypto
      .createHash("sha256")
      .update(username)
      .digest("hex");
    await customerReg(username);
    custID = await getCustomerID(encryptedID);
    const diffRate = await getDiffRateArr(custID);
    console.log("CustomerID in uploadMainTable:", custID);
    const data = {
      CustomerID: custID,
      DiffRateID: diffRate.DiffRateID,
      NO: no,
      DATE: formattedDate,
      MONTH: month,
      FLIGHT: flight,
      MAWB: mawb,
      AWB: awb,
      SHIPPER: shipper,
      COMPANY: username,
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
      FrCostBDT: frCostInBDT,
      CUSTOM: customPrice,
      TOTAL: totalPrice,
      PAIDDATE: paidDate,
      ACTUALPAID: actualPaid,
    };
    console.log("data Table:", data);
    try {
      const response = await axios.post(
        "http://localhost:4000/table/tableinsertion",
        data
      );
      console.log("table response data", response.data);
    } catch (err) {
      console.error("error:", err);
    }
  };
  async function getPrice(weight, price) {
    customPrice = weight * price;
    console.log("customPrice in getPrice:", weight * price);
    return customPrice;
  }

  async function getDiffRateArr(CustomerID) {
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/diffRateArr?CustomerID=${CustomerID}`
      );
      console.log("response data", response.data);
      diffRateArr = response.data;
      // setDiffRateArr(response.data);
      // console.log('getDiffRateArr',diffRateArr);
      await sortAndSearch(response.data, roundWeight);
      console.log("sortAndSearch", price);

      await getPrice(roundWeight, price);
      console.log("customPrice in getDiffRateArr", customPrice);
      // setCustomPrice(getCustPrice);

      totalPrice = customPrice + frCostInBDT + locationCost;
      // setTotalPrice(total);

      // prepaidUpdate();
    } catch (err) {
      console.error(err);
    }
  }
  async function sortAndSearch(arr, ROUNDWGT) {
    for (let i = 0; i < arr[0].length; i++) {
      if (ROUNDWGT <= arr[0][i]) {
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
  async function getPrice(weight, price) {
    customPrice = weight * price;
    console.log("customPrice in getPrice:", weight * price);
    return customPrice;
  }
  return (
    <div>
      <LeftPanel />
      <TopNavbar />
      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          {/* <SeeTableFirstSection /> */}
          <SeeTableSummary />
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};
export default SeeTable;
