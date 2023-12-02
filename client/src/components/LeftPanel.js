import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../img/Logo.png";
import DashboardIcon from "@mui/icons-material/FolderCopyOutlined";
import MonthlyIcon from "@mui/icons-material/AccountBalanceOutlined";
import DailyIcon from "@mui/icons-material/Inventory2Outlined";
import UsersIcon from "@mui/icons-material/PeopleAltOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TocIcon from "@mui/icons-material/Toc";
import LogOut from "./LogOut";
export const menu = [
  { text: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
  {
    text: "Monthly Customers",
    to: "/monthly-customer",
    icon: <MonthlyIcon />,
  },
  { text: "See the Uploaded Table", to: "/seeTable", icon: <TocIcon /> },
  { text: "Location", to: "/location", icon: <DailyIcon /> },
  { text: "Users", to: "/users", icon: <UsersIcon /> },
  { text: "Upload Excel", to: "/upload", icon: <AttachFileIcon /> },
];

const LeftPanel = () => {
  const location = useLocation();

  const lowSection = [
    {
      text: "Settings",
      to: "/settings",
      icon: <ManageAccountsOutlinedIcon />,
    },
  ];
  return (
    <div className="font-[Poppins] hidden py-8 px-6 z-30 fixed left-0 h-screen w-72 bg-white border-r-4 border-gray-100 lg:flex lg:flex-col lg:justify-between">
      <div className="flex flex-col gap-10">
        <p className="flex gap-3 text-4xl items-center">
          <img
            src={Logo}
            alt="SCS Logo"
            className="w-10 p-1 rounded-lg border-2"
          />
          scs
        </p>

        <div className="flex flex-col gap-5">
          <p className="text-slate-500">Main Menu</p>
          {menu.map((el, i) => {
            return (
              <Link
                to={el.to}
                key={i}
                className={`p-2 flex gap-2 items-center rounded-lg hover:bg-gray-100 ${
                  location.pathname === el.to && "bg-gray-200  shadow-sm"
                }`}
              >
                <div>{el.icon}</div>
                <p className="font-semibold text-lg my-auto">{el.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="py-1 flex flex-col gap-1 border-t-2 border-gray-300">
        {lowSection.map((el, i) => {
          return (
            <Link
              to={el.to}
              key={i}
              className={`p-2 flex gap-2 items-center rounded-lg hover:bg-gray-100 ${
                location.pathname === el.to && "bg-gray-200  shadow-sm"
              }`}
            >
              <div>{el.icon}</div>
              <p className="font-semibold text-lg my-auto">{el.text}</p>
            </Link>
          );
        })}
        <LogOut />
      </div>
    </div>
  );
};

export default LeftPanel;
