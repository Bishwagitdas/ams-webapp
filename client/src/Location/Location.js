import React, { useState } from 'react'
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import { allFirstDiv, allSecondDiv,inputStyle,
    labelStyle,
    positiveButton,
    generalInput } from "../components/DesignStandardize";

const Location = () => {
    const[locationname,setLocationname] = useState("");
    const[weight1,setWeight1] = useState(0);
    const[weight2,setWeight2] = useState(0);
    const[weight3,setWeight3] = useState(0);
  return (
    <>
    <LeftPanel />
    <TopNavbar />
    <div className={`${allFirstDiv}`}>
      <div className={`${allSecondDiv}`}>
      <form className="flex flex-col gap-6 items-center" 
    //   onSubmit={register}
      >
      {/* User name */}
      <div className="w-64">
          <label className="label">
            <span className="label-text">Location Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className={`${generalInput}`}
            required
            value={locationname}
            onChange={(e)=>{
                e.preventDefault()
                setLocationname(e.target.value);
            }}
          />
        </div>

        <div className="w-64">
          <label className="label">
            <span className="label-text">Rates for wights less than 1kg</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            required
            value={weight1}
            onChange={(e)=>{
                e.preventDefault()
                setWeight1(e.target.value);
            }}
          />
        </div>

        <div className="w-64">
          <label className="label">
            <span className="label-text">Rates for wights less than 50kg</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            value={weight2}
            onChange={(e)=>{
                e.preventDefault()
                setWeight2(e.target.value);
            }}
            required
          />
        </div>

        <div className="w-64">
          <label className="label">
            <span className="label-text">Weights more than 50kg</span>
          </label>
          <input
            type="number"
            placeholder="Type here"
            className={`${generalInput}`}
            value={weight3}
            onChange={(e)=>{
                e.preventDefault()
                setWeight3(e.target.value);
            }}
            required
          />
        </div>

      

     
     

      <button className={`${positiveButton} m-auto`}>Submit</button>
    </form>
      </div>
      <div className="h-20" />
    </div>
  </>
  )
}

export default Location