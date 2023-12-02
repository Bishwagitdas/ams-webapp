import React from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import FirstSection from "./components/FirstSection";
import UserTable from "./components/UserTable";
import { allFirstDiv, allSecondDiv } from "../components/DesignStandardize";
const Users = () => {
  return (
    <>
      <LeftPanel />
      <TopNavbar />
      <div className={`${allFirstDiv}`}>
        <div className={`${allSecondDiv}`}>
          <FirstSection />
          <UserTable />
        </div>
        <div className="h-20" />
      </div>
    </>
  );
};

export default Users;
