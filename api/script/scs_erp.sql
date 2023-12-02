USE scs_erp;

CREATE TABLE `Customer` (
  `CustomerID` integer AUTO_INCREMENT PRIMARY KEY,
  `Name` varchar(100),
  `Number` varchar(17),
  `EncryptedID` varchar(255),
  `PurchaseMethod` varchar(12)
);

CREATE TABLE `Location` (
	`LocationID` integer AUTO_INCREMENT PRIMARY KEY,
  `locationName` varchar (255),
  `EncryptedID` varchar(255),
  `tillW1` integer,
  `val1` float,
  `tillW2` integer,
  `val2` float,
  `tillW3` integer,
  `val3` float
);


CREATE TABLE `MainTable` (
  `MainTableID` integer AUTO_INCREMENT PRIMARY KEY,
  `CustomerID` integer,
  `DiffRateID` integer,
  `LocationID`integer,
  `NO` VARCHAR (10),
  `DATE` VARCHAR(50),
  `YEAR` VARCHAR (50),
  `MONTH` VARCHAR(50),
  `FLIGHT` varchar(10),
  `MAWB` varchar(50),
  `AWB` varchar (50),
  `SHIPPER` varchar (50),
  `COMPANY` varchar (255),
  `CONTACT PERSON` varchar (255),
  `CONTACT NUMBER` varchar(255),
  `AREA` varchar(255),
  `NOP` integer,
  `WGT` float,
  `SPX TYPE` varchar(255),
  `TYPE OF PAYMENT` varchar(20),
  `DELIVERY ITEM` varchar(100),
  `VOLUME WEIGHT` varchar(255),
  `DATE OF DELIVERY` varchar(255),
  `TIME` varchar(100),
  `RECEIVING PERSON` varchar(255),
  `REMARKS` varchar(255),
  `ROUND WEIGHT` integer,
  `FRCOST$`FLOAT,
  `FRCOSTBDT` FLOAT,
  `CUSTOM` FLOAT,
  `TOTAL` FLOAT,
  `PAID DATE` varchar(255),
  `ACTUAL DATE` varchar(255)
);
CREATE TABLE `DiffRate` (  
  `DiffRateID` integer AUTO_INCREMENT PRIMARY KEY,
  `tillW1` integer,
  `val1` float,
  `tillW2` integer,
  `val2` float,
  `tillW3` integer,
  `val3` float,
  `tillW4` integer,
  `val4` float,
  `tillW5` integer,
  `val5` float,
  `CustomerID` integer
  );


ALTER TABLE `DiffRate` ADD FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`);

ALTER TABLE `MainTable` ADD FOREIGN KEY (`DiffRateID`) REFERENCES `DiffRate` (`DiffRateID`);

ALTER TABLE `MainTable` ADD FOREIGN KEY (`LocationID`) REFERENCES `Location` (`LocationID`);

ALTER TABLE `MainTable` ADD FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`);
