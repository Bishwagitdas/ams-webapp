import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import CustomerDetails from '../AddMonthlyCustomers/components/CustomerDetails'
import { Button } from "@mui/material";
import { blackLinkButton } from "../../components/DesignStandardize";
const MCTable = () => {
  const [customer, setCustomer] = useState([]);
  const [diffRate,setDiffRate] = useState([]);
  const[diffRates,setDiffRates] = useState([]);
  const [selectCustomerID,setSelectedCustomerID] = useState(null);
  const [selectEncryptID,setselectEncryptID] = useState(null);
  const fetchData = async () => {
    await fetch("http://localhost:4000/customer/getCustomer", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "customer data:");
        setCustomer(data.data);
      });
  };
  const fetchDiffrates = async () => {
    await fetch("http://localhost:4000/prepaid/diffrates", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "diffrates data:");
        setDiffRates(data.data);
      });
  };
  // let custID = null;
  // let EncryptedID = null
  // for(const cid of customer){
  //    custID = cid.CustomerID;
  //   EncryptedID=cid.EncryptedID
  // }
  // console.log(custID);
  // console.log(EncryptedID);
  // const fetchSingleCustomer = async () => {
    
  //     const response = await axios
  //     .get(`http://localhost:4000/customer/getSingleCustomer/${customer.CustomerID}`)
  //      console.log("Single Customer:",response.data);
  //      console.log(setSelectedCustomerID(response.data));
    
    
  // };
  const fetchDiffRateID = async()=>{
    try {
      await fetch("http://localhost:4000/getDiffRateID/getDiffRates", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "Diffrate data:");
          setDiffRate(data.data);
        });

    } catch (error) {
      console.log("An error occured");
    }
  }

  useEffect(() => {
    fetchData();
    fetchDiffrates();
    fetchDiffRateID();
   
  }, []);
  useEffect(()=>{
    const handleOutsideClick = (event) => {
      if (event.target.id === "my_modal_5") {
        document.getElementById("my_modal_5").close();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  },[])
  const closeModal = () => {
    document.getElementById("my_modal_5").close();
    // fetchData();
  };
  // useEffect(()=>{
    
  //     fetchSingleCustomer();
    
  // },[])
  return (
    <div className="max-w-96 overflow-auto">
      {/* <div>{diffRate.map((item)=>{
        return(
          <div>{item.DiffRateID}</div>
        )
      })}
      </div> */}
      <table className="table text-center overflow-x-auto">
        <thead>
          <tr className="">
            <th className="sticky left-0 z-10 bg-white">Name</th>
            {/* <th>Calculation Type</th> */}
            <th>Basis</th>
            
          </tr>
        </thead>
        <tbody>
          {customer.map((item, i) => {
              const correspondingDiffRate = diffRates.find(rate => rate.CustomerID === item.CustomerID);
              // console.log(correspondingDiffRate.tillW1?.toString());
              // console.log(typeof correspondingDiffRate);
            return (
              <tr key={i}>
                <td className="sticky left-0 z-10 bg-[#ffffff] font-bold">
                  <Link 
                   to={`/update/${item.CustomerID}/${item.EncryptedID}`}
                
                  >
                    {item.Name}
                  </Link>
                </td>
                {/* // :<td className="sticky left-0 z-10 bg-white">
                //   <Link  */}
                 
                {/* //   // to={`/update/${item.CustomerID}/${item.EncryptedID}`}
                //   onClick={() => { */}
                {/* //     setSelectedCustomerID(item.CustomerID);
                //     setselectEncryptID(item.EncryptedID);
                //     // console.log(setSelectedCustomerID(item.CustomerID));
                //     document.getElementById("my_modal_5").showModal()
                //   }}
                //   >
                //     {item.Name}
                //   </Link>
                // </td>}  */}
                {/* <td className="sticky left-0 z-10 bg-white">
                  <Link to={`/update/${item.CustomerID}/${item.EncryptedID}`}>
                    {item.Name}
                  </Link>
                </td>
                {/* <td>{item.calculationType}</td> */}
                {/* {correspondingDiffRate? */}
                <td className="bg-[#ffffff] font-bold">
                  <p
                    // className={`m-auto rounded-md w-max p-2 ${
                    //   item.PurchaseMethod === "Pre-paid"
                    //     ? "bg-[#D0F4FF]"
                    //     : "bg-[#FBF5C4]"
                    // }`}
                  >
                    {item.PurchaseMethod}
                  </p>
                </td>
                {/* // :<td className="">
                //   <p */}
                {/* //     className={`m-auto rounded-md w-max p-2 ${ */}
                {/* //       item.PurchaseMethod === "Pre-paid"
                //         ? "bg-[#D0F4FF]"
                //         : "bg-[#FBF5C4]"
                //     }`}
                //   >
                //     {item.PurchaseMethod}
                //   </p>
                // </td>} */}
                {/* <td>{item.Number}</td> */}
                {/* {correspondingDiffRate? */}
                <td className="text-[#DB1E1E] bg-[#ffffff] cursor-pointer">
                  <DeleteIcon />
                  <p className="hover:underline">Delete</p>
                </td>
                
{/* <td className="bg-[#ffffff] font-bold">
  <p>{item.PurchaseMethod}</p>
  {correspondingDiffRate && (
    <p>{correspondingDiffRate.tillW1?.toString()}</p>
  )}
</td> */}


{
  correspondingDiffRate && (correspondingDiffRate.tillW1 !== null ||
    correspondingDiffRate.tillW2 !== null ||
    correspondingDiffRate.tillW3 !== null ||
    correspondingDiffRate.tillW4 !== null ||
    correspondingDiffRate.tillW5 !== null ||
    correspondingDiffRate.val1 !== null ||
    correspondingDiffRate.val2 !== null ||
    correspondingDiffRate.val3 !== null ||
    correspondingDiffRate.val4 !== null ||
    correspondingDiffRate.val5 !== null
      )?<></>:<td>
      <button
            className={`${blackLinkButton}`}
            onClick={() => {
              setSelectedCustomerID(item.CustomerID);
              setselectEncryptID(item.EncryptedID);
              document.getElementById("my_modal_5").showModal()}}
          >
      Add Diffrate
      </button>
    </td>
  
   
}
                    
              {/* //   :<td className="text-[#DB1E1E] cursor-pointer">
              //     <DeleteIcon />
              //     <p className="hover:underline">Delete</p>
              //   </td>
              
              // } */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <dialog id="my_modal_5" className="modal m-auto w-11/12 md:w-1/2">
        <div className="modal-box flex flex-col gap-5">
          <div className="flex flex-col gap-3 text-lg">
            <p className="font-bold flex justify-between items-center">
              Add Users
              <button
                className="w-max hover:tooltip hover:tooltip-bottom"
                data-tip="Close"
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
            </p>
            <p className="text-sm text-[#9FA1A6]">
              Press ESC key or click close button to close
            </p>
          </div>
          <CustomerDetails customer={customer} CustomerID={selectCustomerID} EncryptedID={selectEncryptID}/>
        </div>
      </dialog>
    </div>
  );
};

export default MCTable;
