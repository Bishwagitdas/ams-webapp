import React, { useState } from "react";
import { generalInput } from "../../components/DesignStandardize";
import Datepicker from "react-tailwindcss-datepicker";
import { format } from "date-fns";
import SeeTableSummary from "./SeeTableSummary";

// no, formattedDate, month, flight, mawb, awb,
// shipper, username, person, number, area,
// nop, weight, roundWeight, spxType, paymentMethod, deliveryItem,
// volumeWeight, time, receiving, remarks, frCost, frCostInBDT(confusion), paidDate, actualPaid
const SeeTableInputFields = (maintable) => {
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

  //   handle date start
  const [valueDate, setValueDate] = useState([
    { startDate: null, endDate: null },
  ]);

  const handleDateChange = (newDate) => {
    console.log("startDate:", newDate.startDate);
    setValueDate(newDate); //2023-11-16
  };
  // 2023-11-16 to 16.11.2023 conversion
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
  const frCostInBDT = frCost * dollarRate;

  //   Calculate round weight
  const roundWeight = Math.ceil(weight);


  //   console.log(frCost);
  return (
    <div className="flex flex-row flex-wrap gap-10">
      {/* Input fields */}
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

        {/* Username */}
        <div className="w-64">
          <label className="label">Company Name</label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
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

        {/* Fr cost in dollar */}
        <div className="w-64">
          <label className="label">Fr. cost ($)</label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            value={frCost}
            onChange={handleFrCostChange}
          />
        </div>

        {/* Convertion rate from dollar to bdt */}
        <div className="w-64">
          <label className="label">Rate</label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            value={dollarRate}
            onChange={(e) => setDollarRate(e.target.value)}
          />
        </div>

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
      </div>

      {/* Summary */}
      <SeeTableSummary
        no={no}
        formattedDate={formattedDate}
        month={month}
        flight={flight}
        mawb={mawb}
        awb={awb}
        shipper={shipper}
        customerName={customerName}
        person={person}
        number={number}
        area={area}
        nop={nop}
        weight={weight}
        roundWeight={roundWeight}
        spxType={spxType}
        paymentMethod={paymentMethod}
        deliveryItem={deliveryItem}
        volumeWeight={volumeWeight}
        time={time}
        receiving={receiving}
        remarks={remarks}
        frCost={frCost}
        frCostInBDT={frCostInBDT}
        paidDate={paidDate}
        actualPaid={actualPaid}
      />
    </div>
  );
};

export default SeeTableInputFields;
