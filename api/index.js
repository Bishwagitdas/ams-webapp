const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const adminReg = require("./routes/adminReg");
const userReg = require("./routes/userReg");
const userLogin = require("./routes/userLogin");
const userInfo = require("./routes/userInfo");
const adminInfo = require("./routes/adminInfo");
const mCustomer = require("./routes/customer/MCustomerReg");
const MCPreFR = require("./routes/customer/MonthlyCustomer/MCPreFRreg");
const UserManage = require("./routes/userManage");
const adminLogin = require("./routes/adminLogin");
const diffID = require("./routes/customer/MonthlyCustomer/getDiffrateId");
const diffRate = require("./routes/prepaid/diffRate");
const diffRateArr = require("./routes/prepaid/diffRateArr"); // GET diffRate values and creates a 2D arr for price
const getCustomerID = require("./routes/customer/getCustomerID");
const getCustomerAll = require("./routes/customer/CustomerManage");
const getPrepaidTable = require("./routes/prepaid/prepaidFetch");
const prepaidUpdate = require("./routes/prepaid/prepaidUpdate");

const MainTableInsertion = require("./routes/mainTableInsertion");
const MainTableFetch = require("./routes/fetchMainTable");
const mainTableFetchAll = require ("./routes/fetchMainTableAll");
const mainTableFetchAllMonth = require ("./routes/getAllInfoMonth");

const mysql = require("mysql2");

const connection = require("./connection");

const bodyParser = require("body-parser");

// dotenv.config();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json()); // parsing json
app.use("/auth/", adminReg);
app.use("/fetch/", UserManage);
app.use("/auth", adminLogin);
app.use("/userAuth", userLogin);
app.use("/userProfile/", userInfo);
app.use("/adminProfile/", adminInfo);
app.use("/userReg/", userReg);
app.use("/preFixed/", MCPreFR);
app.use("/customReg/", mCustomer);
app.use("/prepaid/", diffRate);
app.use("/prepaid/", getCustomerID);
app.use("/customer/", getCustomerAll);
app.use("/getDiffRateID/", diffID);
app.use("/prepaid", prepaidUpdate);
app.use("/prepaid/", getPrepaidTable);
app.use("/prepaid", diffRateArr);
app.use("/table/", MainTableInsertion);
app.use("/maintable/", MainTableFetch);
app.use("/maintable/", mainTableFetchAll);
app.use("/maintable/", mainTableFetchAllMonth);

app.listen(4000);
