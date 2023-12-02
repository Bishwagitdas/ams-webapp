import React, { useState } from "react";
import Logo from "../img/Logo.png";
import AdminForm from "./components/AdminForm";
import UserForm from "./components/UserForm";
const Authenticate = () => {
  const [toggleState, setToggleState] = useState(1);
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };
  return (
    <div className="flex flex-col gap-10 items-center mt-20">
      <div className="tabs">
        <a
          className={`tab tab-bordered  text-2xl ${
            toggleState === 1 && "tab-active"
          }`}
          onClick={() => {
            changeTab(1);
          }}
        >
          Admin
        </a>
        <a
          className={`tab tab-bordered  text-2xl ${
            toggleState === 2 && "tab-active"
          }`}
          onClick={() => {
            changeTab(2);
          }}
        >
          User
        </a>
      </div>
      <img className="w-48" src={Logo} alt="SCS Logo" />
      {toggleState === 1 ? <AdminForm /> : <UserForm />}
    </div>
  );
};

export default Authenticate;
