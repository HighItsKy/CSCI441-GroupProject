// import any components you want to use in this file:
import Navbar from '../Navbar';
import JobForm from './JobForm';
import TransportHeader from '../header';
import JobList from './JobList';
import JobSearch from './JobSearch';
import { useState, useEffect } from 'react';
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

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {

        const fetchItems = async () => {

            setIsLoading(true);
            //get jobs
            try {
                const response = await axios.get(`/job`);
                setJobs(response.data);

            } catch (err) {
                setErrMsg(`getJobs error: ` + JSON.stringify(err));
                return;
            }
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

        }

        fetchItems();

        setIsLoading(false);

    }, [])

    const filterJobs = (job) => {
        //add search terms with an or
        return (
            job.full_name.includes(searchTerm) ||
            job.job_status.includes(searchTerm) ||
            job.shipper_company.includes(searchTerm) ||
            job.receiver_company.includes(searchTerm)
        );
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

        let carHold;
        try {
            const response = await axios.get(`/carLineItem/?invoice_id=${jobVal.invoice_id}`);
            if (response.data)
                carHold = [...response.data];

        } catch (err) {
            setErrMsg(`getCarLineItem error: ` + JSON.stringify(err));

        }

        for (let i = 0; i < carHold.length; i++) {
            try {
                const response = await axios.get(`/vehicle/${carHold[i].vehicle_id}`);
                carHold[i] = { ...carHold[i], ...response.data[0] };
            } catch (err) {
                setErrMsg(`getVehicles error: ` + JSON.stringify(err));
            }
        }
        setCars(carHold);
        setJob(jobVal);
    }

    const addCar = () => {
        const newCar = { vehicle_color: "", vehicle_make: "", vehicle_year: "", vehicle_model: "", vin: "", note: "", shipping_cost: "", };
        setCars(newCars => ([...cars, newCar]));
    }

    const changeVal = (key, value) => {
        setJob(job => ({ ...job, [key]: value }));
        console.log(job);
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
                    <JobForm key={currentUser.id} user={currentUser} job={job} cars={cars} setJob={setJob} changeVal={changeVal} addCar={addCar} />
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