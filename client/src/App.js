import "./App.css";
import { Routes, Route } from "react-router-dom";
import DBoard from "./DBoard/DBoard";
import MonthlyCustomer from "./Monthly/MonthlyCustomer";
import Authenticate from "./Authentication/Authenticate";
import Daily from "./Daily/Daily";
import Users from "./Users/Users";
import Settings from "./Settings/Settings";
import UserReg from "./Users/components/UserReg";
import Adminreg from "./Adminreg/Adminreg";
import AddMonthlyCustomers from "./Monthly/AddMonthlyCustomers/AddMonthlyCustomers";
import EditUser from "./Users/UserEdit/EditUser";
import MCBillGenerate from "./Monthly/components/MCBillGenerate";
import Summary from "./Monthly/AddMonthlyCustomers/components/Summary";
import MCUpdate from "./Monthly/AddDataMC/MCUpdate";
import Upload from "./Upload/Upload";
import SeeTable from "./SeeTable/SeeTable";
import ShowDiffRate from "./Monthly/components/ShowDiffRate";
import Download from "./Monthly/AddDataMC/components/Download";
import Location from "./Location/Location";
function App() {
  const isAdminLoggedIn = window.localStorage.getItem("adminloggedIn");
  const isUserLoggedIn = window.localStorage.getItem("userLogin");
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAdminLoggedIn || isUserLoggedIn ? <DBoard /> : <Authenticate />
          }
        />
        <Route path="/admin-reg" element={<Adminreg />} />
        {(isAdminLoggedIn || isUserLoggedIn) && (
          <>
            <Route path="/monthly-customer" element={<MonthlyCustomer />} />
            <Route path="/addCustomer" element={<AddMonthlyCustomers />} />
            <Route path="/dashboard" element={<DBoard />} />
            <Route path="/monthly-customer" element={<MonthlyCustomer />} />
            <Route path="/addCustomer" element={<AddMonthlyCustomers />} />
            <Route path="/daily-customer" element={<Daily />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userEdit/:id" element={<EditUser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<UserReg />} />
            <Route path="/mCustomerReg" element={<Summary />} />
            <Route path="/bill" element={<MCBillGenerate />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/seeTable" element={<SeeTable />} />
            <Route path="/seeDiffRate" element={<ShowDiffRate />} />
            <Route path="/location" element={<Location/>}/>
            <Route path="/update/:CustomerID/:Name" element={<MCUpdate />} />
            <Route path="/download/:CustomerID/:Name" element={<Download />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
