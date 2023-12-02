import React, { useEffect, useState } from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import * as xlsx from "xlsx";
import crypto from "crypto-browserify";
import axios from "axios";
// import { format } from "date-fns";
import {
  allFirstDiv,
  allSecondDiv,
  monthNumberToAbbreviation,
} from "../components/DesignStandardize";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const Upload = () => {
  const [filedata, setFileData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [hashResult, setHashResult] = useState(null);
  const [loading,setLoading] = useState(false);
  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false);
  //   },5000);
  // })
  const filterDuplicates = (nestedArray) => {
    
    const uniqueNames = [];
    const seenNames = {};

    return nestedArray.filter((item) => {
      if (
        item &&
        (item.COMPANY || item["COMPANY NAME"] || item[" COMPANY NAME "]) &&
        (!seenNames[item.COMPANY] ||
          !seenNames[item["COMPANY NAME"]] ||
          !seenNames[item[" COMPANY NAME "]])
      ) {
        seenNames[item.COMPANY] = true;
        uniqueNames.push(item.COMPANY);
        return true;
      }
      return false;
    });
  };
  const uniqueCustomer = filterDuplicates(filedata);
  console.log(uniqueCustomer);

  const customerReg = async () => {
    for (const customer of uniqueCustomer) {
      const data = {
        COMPANY: (
          customer.COMPANY ||
          customer["COMPANY NAME"] ||
          customer[" COMPANY NAME "]
        )
          ?.toString()
          .trim(),
        EncryptedID: crypto
          .createHash("sha256")
          .update(
            customer.COMPANY ||
              customer["COMPANY NAME"] ||
              customer[" COMPANY NAME "]
          )
          .digest("hex"),
        TypeOfPayment: customer["TYPE OF PAYMENT"],
        DeliveryItem: customer["DELIVERY ITEM"],
      };

      console.log("data", data);
      try {
        const response = await axios.post(
          "http://localhost:4000/customReg/mCustomerReg",
          data
        );
        console.log(response.data);

        await setDiffRateID(customer);
        // setDiffRate(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  async function setDiffRateID(customer) {
    // Define Express.js API endpoint
    const custID = await getCustomerID(
      customer.COMPANY || customer["COMPANY NAME"] || customer[" COMPANY NAME "]
    );
    // const differentRate = await diffRateID(custID);
    // console.log(differentRate);
    const data = {
      customerID: custID,
    };
    // console.log(hash);
    try {
      const response = await axios.post(
        "http://localhost:4000/prepaid/diffID",
        data
      );
      console.log("diffrate:", response.data);
      // setDiffRate(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const readexcel = async (e) => {
    setLoading(true);
    const selectedFile = e.target.files[0];
    const data = await selectedFile.arrayBuffer(selectedFile);
    console.log(selectedFile);
    console.log(data);
    const excelFile = xlsx.read(data);
    console.log(excelFile);
    const excelSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const excelJson = xlsx.utils.sheet_to_json(excelSheet);
    console.log(excelJson);
    setFileData(excelJson);
    setLoading(false);
  };
  async function getDiffrateID(custID) {
    // if(custID=== undefined){return null}

    try {
      const response = await axios.get(
        `http://localhost:4000/getDiffRateID/getDiffRateID?customerID=${custID}`
      );
      console.log("DiffrateID: ", response.data.DiffRateID);
      return response.data.DiffRateID;
    } catch (error) {
      console.log("An error occured");
    }
  }
  async function getCustomerID(username) {
    if (username === undefined) {
      return null;
    }
    const hash = crypto.createHash("sha256").update(username).digest("hex");
    try {
      const response = await axios.get(
        `http://localhost:4000/prepaid/getCustomerID?EncryptedID=${hash}`
      );
      console.log("custID inside:", response.data.customerID);
      return response.data.customerID;

      // console.log("custID:", custID);
      // setCustID(response.data.customerID);
      // setCustID(response.data.customerID);
      //  console.log(setCustID(response.customerID));
      //  console.log(custID);
    } catch (err) {
      console.error(err);
    }
  }
  const DateCheck = () => {
    for (const row of filedata) {
      const formattedDate = row.DATE;
      // ? row.DATE
      //
      // format(new Date(row.DATE), "dd.MM.yy")
      // : null;
      console.log("formatted date", formattedDate);
      // 10-Nov-2023 to Nov conversion
      // const dateString = "02.08.23";

      const [day, monthNumber, year] = formattedDate.split(".");
      const month = monthNumberToAbbreviation[monthNumber];
      console.log("Day:", day);
      console.log("Month:", month);
      console.log("Year:", year);

      // const month = row.DATE
      //   ? format(new Date(row.DATE), "MMM")
      //   : null;
      // console.log(month);
      const data = {
        Date: formattedDate,
        Month: month,
      };
      // console.log(data);
    }
  };
  // const date = DateCheck();
  // console.log(date);
  const uploadMainTable = async () => {
    try {
      for (const row of filedata) {
        const custID = await getCustomerID(row.COMPANY || row["COMPANY NAME"]);
        // const differentRate = await diffRateID(custID);
        // console.log(differentRate);
        // const DiffRateID = await getDiffrateID(custID);
  
        if (custID !== undefined) {
          console.log(
            "custID is undefined for ",
            row.COMPANY || row["COMPANY NAME"] || row[" COMPANY NAME "]
          );
        }
        const DiffRateID = await getDiffrateID(custID);
        console.log("custID in uploadMainTable:", custID);
        //
        const formattedDate = row.DATE;
        const [day, monthNumber, year] = formattedDate?.split(".") || [];
        const currentYear = new Date().getFullYear();
        const currentCentury = Math.floor(currentYear / 100) * 100;

        // Convert two-digit year to four-digit year
        const fourDigitYear = currentCentury + parseInt(year);

        console.log(fourDigitYear);
        // console.log(year);
        // if (formattedDate) {
        //   const [day, monthNumber, year] = formattedDate.split(".");
        //   // Now you can use day, monthNumber, and year
        //   console.log(day, monthNumber, year);
        // } else {
        //   console.error("formattedDate is undefined or null");
        // }
        // const [day, monthNumber, year] = formattedDate?.split(".");
        const month = monthNumberToAbbreviation[monthNumber];
        
        //   const formattedDate = row.DATE
        //   ? format(new Date(row.DATE), "dd.MMM.yyyy")
        //   : null;
        //   console.log(formattedDate);
        // // 10-Nov-2023 to Nov conversion
        // const month = row.DATE
        //   ? format(new Date(row.DATE), "mmm")
        //   : null;
        //   console.log(month);
        const data = {
          CustomerID: custID,
          // DiffRateID: DiffRateID,
          // NO: row.NO !== null? row.NO.toString() : null,
          NO: row.NO,
          DiffRateID: DiffRateID,
          NO: row.NO,
          // !== null? row.NO.toString() : null,
          // typeof row.NO === 'number' ? row.NO : parseInt(row.NO.trim(), 10) || null,
          DATE: row.DATE?.trim(),
          MONTH: month,
          YEAR:fourDigitYear.toString(),
          FLIGHT: row.FLIGHT,
          // ?.trim(),
          MAWB: row.MAWB,
          AWB: row.AWB,
          SHIPPER: row.SHIPPER,
          COMPANY:
            (row.COMPANY || row["COMPANY NAME"] || row[" COMPANY NAME "])
              ?.toString()
              .trim() || null,
          PERSON: row["CONTACT PERSON"]?.toString().trim(),
          NUMBER: row["CONTACT NUMBER "]?.toString().trim(),
          AREA: row.AREA?.trim(),
          NOP: row.NOP,
          WGT: row.WGT,
          SPXTYPE: (row["SPX TYPE"] || row[" SPX TYPE"])?.trim(),
          PAYMENTMETH: row["TYPE OF PAYMENT"]?.trim(),
          DELIVERYITEM: row["DELIVERY ITEM"]?.trim(),
          VOLUMEWEIGHT: row["VOLUME WEIGHT"]?.trim(),
          TIME: row["TIME"]?.trim(),
          RECEIVING: row["RECEIVING PERSON"]?.trim(),
          REMARKS: row["REMARKS"]?.trim(),
          ROUNDWGT: row[" ROUND WEIGHT "],
          FrCost$: row[" Fr. COST($) "],
          // parseFloat((row[" Fr. COST($) "]?? '').replace(/[^\d.]/g, '')),
          FrCostBDT: row[" Fr. COST(TK) "],
          // parseFloat((row[" Fr. COST(TK) "]?? '').replace(/[^\d.]/g, '')),
          CUSTOM: row[" CUSTOM "],
          // parseFloat((row[" CUSTOM "]?? '').replace(/[^\d.]/g, '')),
          TOTAL: row[" TOTAL "],
          // parseFloat((row[" TOTAL "]?? '').replace(/[^\d.]/g, '')),
          PAIDDATE: row["PAID DATE"]?.trim(),
          ACTUALPAID: row["ACTUAL PAID"]?.toString().trim(),
        };
        console.log("data Table:", data);
        try {
          const response = await axios.post(
            "http://localhost:4000/table/tableinsertion",
            data
          );
          console.log("table response data", response.data);
          // toast.success("All the Data has been Inserted Successfully!")
        } catch (err) {
          console.error("error:", err);
          // toast.error("An error occured");
        }
        // const differentRate = await diffRateID(custID);
        // console.log(differentRate);
      }
      toast.success("All the data has been inserted Successfully!")
      
    } catch (error) {
      toast.error("An error occured");
    }
  };

  //MAWB	AWB	SHIPPER	COMPANY	CONTACT PERSON	CONTACT NUMBER 	AREA	NOP	WGT	 SPX TYPE	TYPE OF PAYMENT	DELIVERY ITEM	VOLUME WEIGHT	DATE OF DELIVERY	TIME	RECEIVING PERSON		REMARKS	 ROUND WEIGHT 	 Fr. COST($) 	 Fr. COST(TK) 	 CUSTOM 	 TOTAL 	PAID DATE	ACTUAL PAID

  // Customer registration panel
  const oneClickForAllMethods = async () => {
    await customerReg();
    // await diffRateID();
    await uploadMainTable();
  };
  return (
    <>
      <LeftPanel />
      <TopNavbar />

      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          <button onClick={oneClickForAllMethods}>Click here</button>
          {/* cghdgj */}
          <div>
            {/* <input
        type="text"
        class="file-input file-input-bordered w-full max-w-xs"
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
        placeholder="Enter text to hash"
      /> */}
            {/* <button onClick={generateHash}>Generate Hash</button> */}
            {/* {hashResult && (
        <div>
          <h3>Hash Result:</h3>
          <p>{hashResult}</p>
        </div>
      )} */}
          </div>
          {/* fgbxg */}
          <input
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              readexcel(e);
            }}
          />

          <div className="max-w-96 max-h-[500px] overflow-auto">
            <form
            // onSubmit={postCustomer}
            >
              {/* <button>Add Customer</button> */}
              {loading?<p>
                Please wait for the data to render.......<ClipLoader 
                 color="##ffffff" 
                 loading={loading} 
                // cssOverride={override}
                 size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              /></p>
                  :
                  
              <table className="table text-center overflow-x-auto">
                {/* head */}
                <thead>
                  <tr className="">
                    <th className="sticky left-0 z-10 bg-white">Serial No.</th>
                    <th className=" z-10 bg-white">Flight</th>
                    <th className=" z-10 bg-white">Date</th>
                    <th className=" z-10 bg-white">MAWB</th>
                    <th className=" z-10 bg-white">AWB</th>
                    <th className=" z-10 bg-white">Shipper</th>
                    <th className=" z-10 bg-white">Company</th>
                    <th className=" z-10 bg-white">Contact Person</th>
                    <th className=" z-10 bg-white">Contact Number</th>
                    <th className=" z-10 bg-white">Area</th>
                    <th className=" z-10 bg-white">NOP</th>
                    <th className=" z-10 bg-white">WGT</th>
                    <th className=" z-10 bg-white">Spx Type</th>
                    <th className=" z-10 bg-white">Type of Payment</th>
                    <th className=" z-10 bg-white">Delivery Type</th>
                    <th className=" z-10 bg-white">Volume of Weight</th>
                    <th className=" z-10 bg-white">Custom</th>
                    <th className=" z-10 bg-white">Total</th>
                    {/* <th className="sticky left-0 z-10 bg-white">NOP</th> */}
                  </tr>
                </thead>
                <tbody>
                  {uniqueCustomer.map((el, i) => {
                    // CustomerReg(el.COMPANY, hash);
                    return (
                      <tr className="">
                        <td className="sticky left-0 z-10 bg-white">{i + 1}</td>
                        <td className="">{el.NO}</td>
                        <td>{el.DATE}</td>
                        <td className="">{el.MAWB}</td>
                        <td className="">{el.AWB}</td>
                        <td className="">{el.SHIPPER}</td>
                        <td className="">
                          {el.COMPANY ||
                            el["COMPANY NAME"] ||
                            el[" COMPANY NAME "]}
                        </td>
                        <td className="">{el["CONTACT NUMBER"]}</td>
                        <td className="">{el.PERSON}</td>
                        <td className="">{el["CONTACT PERSON"]}</td>
                        <td className="">{el.AREA}</td>
                        <td className="">{el.NOP}</td>
                        <td className="">{el.WGT}</td>
                        <td className="">{el["SPX TYPE"]}</td>
                        <td className="">{el["TYPE OF PAYMENT"]}</td>
                        <td className="">{el["DELIVERY TYPE"]}</td>
                        <td className="">{el["VOLUME OF WEIGHT"]}</td>
                        <td className="">{el.CUSTOM}</td>
                        <td className="">{el.TOTAL}</td>
                        <td className=""> {el["Fr. COST($)"]} </td>
                        <td className=""> {el["Fr. COST(TK)"]} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                  }
            </form>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </>
  );
};

export default Upload;
