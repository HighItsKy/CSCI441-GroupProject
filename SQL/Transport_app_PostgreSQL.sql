CREATE TABLE Truck (
    Truck_ID SERIAL PRIMARY KEY NOT NULL,
    Truck_VIN VARCHAR(17),
    Truck_Max_Load REAL,
    Truck_Capacity INTEGER NOT NULL,
    Truck_Mileage INTEGER
);

CREATE TABLE Vehicle (
    Vehicle_ID SERIAL PRIMARY KEY NOT NULL,
    VIN VARCHAR(17) NOT NULL,
    Vehicle_Make VARCHAR(255) NOT NULL,
    Vehicle_Model VARCHAR(255) NOT NULL,
    Vehicle_Year INTEGER NOT NULL,
    Vehicle_Color VARCHAR(255) NOT NULL
);

CREATE TABLE Customer (
    Customer_ID SERIAL PRIMARY KEY NOT NULL,
    Customer_First_Name VARCHAR(255) NOT NULL,
    Customer_Last_Name VARCHAR(255) NOT NULL,
    Branch_Name VARCHAR(255) NOT NULL
);


CREATE TABLE Employee (
    Employee_ID SERIAL PRIMARY KEY NOT NULL,
    Is_Admin BOOLEAN NOT NULL,
    Is_Driver BOOLEAN NOT NULL,
    Employee_First_Name VARCHAR(255) NOT NULL,
    Employee_Last_Name VARCHAR(255) NOT NULL,
    Employee_Username VARCHAR(20) NOT NULL,
    Employee_Password VARCHAR(20) NOT NULL,
    Employee_Contact_No VARCHAR(20) NOT NULL,
    Employee_Street_Address VARCHAR(255),
    Employee_City VARCHAR(255),
    Employee_State VARCHAR(13),
    Employee_Zip_Code VARCHAR(9),
	Employee_Email VARCHAR (255)
);


CREATE TABLE Job (
    Invoice_ID SERIAL PRIMARY KEY NOT NULL,
    Shipper_ID INTEGER NOT NULL,
    Receiver_ID INTEGER NOT NULL,
    Truck_ID INTEGER NOT NULL,
    Driver_ID INTEGER,
    Intake_ID INTEGER NOT NULL,
    Driver_signature BYTEA,
    Shipper_Signature BYTEA,
    Receiver_Signature BYTEA,
	Date_of_Order DATE NOT NULL,
	Date_Complete DATE,
    Job_Status VARCHAR(255) 
	CHECK (Job_Status IN ('Pending','Loading','Enroute','Arrived','Unloaded','Complete')),
    Special_Instructions VARCHAR (2000),
    FOREIGN KEY (Shipper_ID) REFERENCES Customer(Customer_ID),
    FOREIGN KEY (Receiver_ID) REFERENCES Customer(Customer_ID),
    FOREIGN KEY (Truck_ID) REFERENCES Truck(Truck_ID),
    FOREIGN KEY (Driver_ID) REFERENCES Employee(Employee_ID)
);


CREATE TABLE Car_Line_Item (
    Car_Line_Item_ID SERIAL PRIMARY KEY NOT NULL,
    Vehicle_ID INTEGER NOT NULL,
    Invoice_ID INTEGER NOT NULL,
    Line_drawing BYTEA,
    Shipping_Cost DECIMAL(10,2) NOT NULL,
    Notes VARCHAR(2000),
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID),
    FOREIGN KEY (Invoice_ID) REFERENCES Job(Invoice_ID)
);


CREATE TABLE Photo_Record (
    Photo_ID SERIAL PRIMARY KEY NOT NULL,
    Car_Line_Item_ID INTEGER NOT NULL,
    URL VARCHAR(4096) NOT NULL,
	Note VARCHAR (2000),
    FOREIGN KEY (Car_Line_Item_ID) REFERENCES Car_Line_Item(Car_Line_Item_ID)
);

/*To save companies details*/

CREATE TABLE Company (
	Company_ID SERIAL PRIMARY KEY NOT NULL,
	Company_Name VARCHAR(255) UNIQUE NOT NULL
);

/*To save company branches in case we are transferring from one branch to another for the same company*/

CREATE TABLE Company_Branch (
	Company_Branch_ID SERIAL PRIMARY KEY NOT NULL,
	Company_ID INTEGER NOT NULL,
	Branch_Name VARCHAR(255) UNIQUE NOT NULL,
	Branch_Contact_No VARCHAR(20) NOT NULL,
    Branch_Street_Address VARCHAR(255),
    Branch_City VARCHAR(255),
    Branch_State VARCHAR(13),
    Branch_Zip_Code VARCHAR(9),
	Branch_Email VARCHAR (255),
	FOREIGN KEY (Company_ID) REFERENCES Company(Company_ID)
);
