import React from "react";
import LeftPanel from "../components/LeftPanel";
import TopNavbar from "../components/TopNavbar";
import OverviewSection from "./components/OverviewSection";
import ShortcutSection from "./components/ShortcutSection";
const DBoard = () => {
  return (
    <>
      <LeftPanel />
      <TopNavbar />
      <div className="lg:ml-72 bg-gray-100 min-h-screen pt-14 font-[Poppins]">
        <div className="flex flex-col gap-16 h-full bg-white m-2 p-4 md:m-12 md:p-12">
          <OverviewSection />
          <ShortcutSection />
        </div>
        <div className="h-20" />
      </div>
    </>
  );
};

export default DBoard;
