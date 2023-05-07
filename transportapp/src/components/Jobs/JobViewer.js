// import any components you want to use in this file:
import Navbar from '../Navbar';
import JobForm from './JobForm';
import TransportHeader from '../header';
import JobList from './JobList';
import JobSearch from './JobSearch';
import { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import React from 'react';
import axios from "../../api/axios";

function JobViewer({ user }) {

    const adminUser = {
        id: 101,
        isAdmin: true,
        isDriver: false,
        firstName: "Chris",
        lastName: "Pratt",
        username: "starlord1982",
        password: "12345",
        phone: "(123) 456-7890",
        streetAddress: "123 Star Court",
        city: "city",
        state: "state",
        email: "email@mail.com"
    }

    const driverUser = {
        id: 501,
        isAdmin: false,
        isDriver: true,
        firstName: "Rocket",
        lastName: "Racoon",
        username: "firepower777",
        password: "54321",
        phone: "(111) 222-3333",
        streetAddress: "444 emerald drive",
        city: "other city",
        state: "other state",
        email: "rocket@email.com"
    }


    // change this to change which user info shows up
    const [currentUser, setCurrentUser] = useState(adminUser);
    const [job, setJob] = useState({});
    const [cars, setCars] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [shipperBranches, setShipperBranches] = useState([]);
    const [receiverBranches, setReceiverBranches] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isJobEdited, setIsJobEdited] = useState(false);
    const [areCarsEdited, setAreCarsEdited] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const startRef = useRef(null);

    const fetchItems = async () => {

        setIsLoading(true);
        //get jobs
        let jobsVal;
        try {
            const response = await axios.get(`/job`);
            jobsVal = response.data;

        } catch (err) {
            setErrMsg(`getJobs error: ` + JSON.stringify(err));
            return;
        }

        jobsVal.map(async (jobVal) => {


            try {
                const response = await axios.get(`/carLineItem/?invoice_id=${jobVal.invoice_id}`);
                if (response.data)
                    jobVal.cars = response.data;

            } catch (err) {
                setErrMsg(`getCarLineItem error: ` + JSON.stringify(err));

            }

        });

        setJobs(jobsVal);

        //get Trucks
        try {
            const response = await axios.get(`/truck`);
            setTrucks(response.data);

        } catch (err) {
            setErrMsg(`getTruck error: ` + JSON.stringify(err));
            return;
        }

        //get Employees
        try {
            const response = await axios.get(`/employee`);
            setEmployees(response.data);

        } catch (err) {
            setErrMsg(`getEmployees error: ` + JSON.stringify(err));
            return;
        }

        //get Companies
        try {
            const response = await axios.get(`/company`);
            setCompanies(response.data);

        } catch (err) {
            setErrMsg(`getCompanies error: ` + JSON.stringify(err));
            return;
        }

        //get Customers
        try {
            const response = await axios.get(`/customer`);
            setCustomers(response.data);

        } catch (err) {
            setErrMsg(`getCustomer error: ` + JSON.stringify(err));
            return;
        }

        getAllCars();


        setIsLoading(false);

    }

    const getAllCars = async () => {
        //get All Cars
        try {
            const response = await axios.get(`/vehicle`);
            setAllCars(response.data);

        } catch (err) {
            setErrMsg(`getCars error: ` + JSON.stringify(err));
            return;
        }
    }

    useEffect(() => {

        fetchItems();


    }, [])

    const filterJobs = (jobVal) => {
        //add search terms with an or
        return (
            jobVal.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jobVal.job_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jobVal.shipper_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            jobVal.receiver_company.includes(searchTerm.toLowerCase()) ||
            !jobVal.cars.every((aCar) => {
                aCar.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    aCar.notes.toLowerCase().includes(searchTerm.toLowerCase())
            }));
    }



    const getJob = async (id) => {
        let jobVal = {};
        //get job
        try {
            const response = await axios.get(`/job/${id}`);
            jobVal = response.data[0];
        } catch (err) {
            setErrMsg(`getJob error: ` + JSON.stringify(err));
            return;
        }

        try {
            const response = await axios.get(`/carLineItem/?invoice_id=${jobVal.invoice_id}`);
            if (response.data)
                setCars(response.data);

        } catch (err) {
            setErrMsg(`getCarLineItem error: ` + JSON.stringify(err));

        }

        const shipperBranchesVal = await getBranches(jobVal.shipper_company_id);
        const receiverBranchesVal = await getBranches(jobVal.receiver_company_id);

        setShipperBranches(shipperBranchesVal);
        setReceiverBranches(receiverBranchesVal);
        setJob(jobVal);
        setAreCarsEdited(false);
        setIsJobEdited(false);
    }

    const getBranches = async (id) => {

        try {
            const response = await axios.get(`/company/${id}/branches`);

            return response.data;

        } catch (err) {
            setErrMsg(`getJob error: ` + JSON.stringify(err));
            return [];
        }
    }

    const addCar = () => {
        setAreCarsEdited(true);
        const newCar = { vehicle_color: "", vehicle_make: "", vehicle_year: "", vehicle_model: "", vin: "", note: "", shipping_cost: "", };
        setCars(newCars => ([...cars, newCar]));
    }

    const changeVal = async (key, value) => {
        setIsJobEdited(true);
        setJob(job => ({ ...job, [key]: value }));
        if (key === 'shipper_company_id') {
            const shipperBranchesVal = await getBranches(value);
            setShipperBranches(shipperBranchesVal);
        }
        if (key === 'receiver_company_id') {
            const receiverBranchesVal = await getBranches(value);
            setReceiverBranches(receiverBranchesVal);
        }
    }

    const updateShipperBranches = async () => {
        const shipperBranchesVal = await getBranches(job.shipper_company_id);
        setShipperBranches(shipperBranchesVal);
    }

    const updateReceiverBranches = async (value) => {
        const receiverBranchesVal = await getBranches(job.receiver_company_id);
        setReceiverBranches(receiverBranchesVal);
    }

    const changeCarVal = (key, value, index) => {
        setAreCarsEdited(true);
        let newArr = [...cars];
        newArr[index - 1] = ({ ...newArr[index - 1], [key]: value });
        if (key === 'vehicle_id' && value != "add") {
            console.log(value);
            const carVal = allCars.find(vehicle => vehicle.vehicle_id == value);
            newArr[index - 1] = ({ ...newArr[index - 1], 'vehicle_year': carVal.vehicle_year });
            newArr[index - 1] = ({ ...newArr[index - 1], 'vehicle_make': carVal.vehicle_make });
            newArr[index - 1] = ({ ...newArr[index - 1], 'vehicle_model': carVal.vehicle_model });
            newArr[index - 1] = ({ ...newArr[index - 1], 'vehicle_color': carVal.vehicle_color });
            newArr[index - 1] = ({ ...newArr[index - 1], 'vin': carVal.vin });

        }
        setCars(newArr);
    }

    const updateLineDrawing = (data, index) => {
        setAreCarsEdited(true);
        let newArr = [...cars];
        newArr[index - 1] = ({ ...newArr[index - 1], line_drawing: data });
        setCars(newArr);
    }

    const addCompanyValues = (companyId, companyName) => {
        setCompanies(companies => ([...companies, { company_id: companyId, company_name: companyName }]));
    }

    const updateSignature = (data, key) => {
        setIsJobEdited(true);
        setJob(job => ({ ...job, [key]: data }));
    }

    const updateJob = async (e) => {

        e.preventDefault();

        const form = e.target;

        try {

            //shipper customer
            //update
            if (job.shipper_id) {
                const customerVal = {
                    customer_id: job.shipper_id, customer_first_name: job.shipper_first_name,
                    customer_last_name: job.shipper_last_name,
                    branch_id: job.shipper_branch_id
                }

                let data = JSON.stringify(customerVal);

                const response = await axios.put('/customer', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );
            } else {
                //create
                const customerVal = {
                    customer_first_name: job.shipper_first_name,
                    customer_last_name: job.shipper_last_name,
                    branch_id: job.shipper_branch_id
                }

                let data = JSON.stringify(customerVal);
                console.log(data);
                const response = await axios.post('/customer', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

                job.shipper_id = response.data[0].customer_id;
            }

            //receiver customer
            //update

            if (job.receiver_id) {
                const customerVal = {
                    customer_id: job.receiver_id, customer_first_name: job.receiver_first_name,
                    customer_last_name: job.receiver_last_name,
                    branch_id: job.receiver_branch_id
                }

                let data = JSON.stringify(customerVal);

                const response = await axios.put('/customer', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

                job.receiver_id = response.data[0].customer_id;
            } else {
                //create
                const customerVal = {
                    customer_first_name: job.receiver_first_name,
                    customer_last_name: job.receiver_last_name,
                    branch_id: job.receiver_branch_id
                }

                let data = JSON.stringify(customerVal);

                const response = await axios.post('/customer', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

                job.receiver_id = response.data[0].customer_id;
            }


            let invoice = job.invoice_id

            //update job
            //create
            if (!job.invoice_id) {

                const jobVal = {
                    shipper_id: job.shipper_id,
                    date_of_order: job.date_of_order,
                    receiver_id: job.receiver_id,
                    truck_id: job.truck_id,
                    driver_id: job.driver_id,
                    intake_id: job.intake_id,
                    driver_signature: job.driver_signature,
                    shipper_signature: job.shipper_signature,
                    receiver: job.receiver_signature,
                    special_instructions: job.special_instructions
                };
                let data = JSON.stringify(jobVal);
                const response = await axios.post('/job', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

                invoice = response.data[0].invoice_id;

            } else {

                const jobVal = {
                    invoice_id: job.invoice_id,
                    date_of_order: job.date_of_order,
                    shipper_id: job.shipper_id,
                    receiver_id: job.receiver_id,
                    truck_id: job.truck_id,
                    driver_id: job.driver_id,
                    intake_id: job.intake_id,
                    driver_signature: job.driver_signature,
                    shipper_signature: job.shipper_signature,
                    receiver: job.receiver_signature,
                    job_status: job.job_status,
                    special_instructions: job.special_instructions
                };

                let data = JSON.stringify(jobVal);
                const response = await axios.put('/job', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );

            }

            // line item
            if (cars) {
                cars.map(async (vehicle) => {

                    //update
                    if (vehicle.car_line_item_id) {
                        const vehicleVal = {
                            car_line_item_id: vehicle.car_line_item_id,
                            vehicle_id: vehicle.vehicle_id,
                            invoice_id: invoice,
                            line_drawing: vehicle.line_drawing,
                            shipping_cost: vehicle.shipping_cost,
                            notes: vehicle.notes
                        }

                        let data = JSON.stringify(vehicleVal);
                        const response = await axios.put('/carlineitem', data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        );
                    } else {
                        //create
                        const vehicleVal = {
                            vehicle_id: vehicle.vehicle_id,
                            invoice_id: invoice,
                            line_drawing: vehicle.line_drawing,
                            shipping_cost: vehicle.shipping_cost,
                            notes: vehicle.notes
                        }

                        let data = JSON.stringify(vehicleVal);
                        console.log(data);
                        const response = await axios.post('/carlineitem', data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        );
                    }
                });

            }

        } catch (err) {
            setErrMsg(JSON.stringify(err));
            return;
        }

        fetchItems();

        setAreCarsEdited(false);
        setIsJobEdited(false);

        startRef.focus();

        form.reset();

    }

    const resetJob = (e) => {
        const form = e.target;

        form.date_of_order.focus();

        const jobVal = {};
        jobVal.driver_signature = null;
        jobVal.shipper_signature = null;
        setJob(jobVal);
        setCars([]);
        setAreCarsEdited(false);
        setIsJobEdited(false);

    }

    return (
        <main>

            <TransportHeader />

            <Navbar key={currentUser.id} user={currentUser} />

            {/*If the user is an admin user then it shows the Form to create the job
               Otherwise the user just sees the jobs for them
              */}

            <Row>
                <Col xs={1}></Col>
                <Col md={5}>
                    <JobForm key={currentUser.id}
                        user={currentUser}
                        job={job}
                        cars={cars}
                        trucks={trucks}
                        employees={employees}
                        customers={customers}
                        companies={companies}
                        shipperBranches={shipperBranches}
                        receiverBranches={receiverBranches}
                        allCars={allCars}
                        changeCarVal={changeCarVal}
                        changeVal={changeVal}
                        addCar={addCar}
                        updateLineDrawing={updateLineDrawing}
                        updateSignature={updateSignature}
                        updateJob={updateJob}
                        resetJob={resetJob}
                        addCompanyValues={addCompanyValues}
                        updateReceiverBranches={updateReceiverBranches}
                        updateShipperBranches={updateShipperBranches}
                        getAllCars={getAllCars}
                        startRef={startRef}
                    />
                </Col>
                <Col md={5}>
                    <>
                        {
                            !errMsg ?
                                <>
                                    {
                                        isLoading ?
                                            <>
                                                <h1> Loading ....</h1>
                                            </>
                                            :
                                            <>
                                                <JobSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                                <JobList
                                                    key={currentUser.id}
                                                    user={currentUser}
                                                    jobs={jobs.filter(job => filterJobs(job))}
                                                    getJob={getJob}
                                                />
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <h1>{errMsg}</h1>
                                </>
                        }
                    </>
                </Col>
                <Col xs={1}></Col>
            </Row>

        </main>
    )
}

export default JobViewer;