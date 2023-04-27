// import any components you want to use in this file:
import Navbar from '../Navbar';
import JobForm from './JobForm';
import TransportHeader from '../header';
import JobList from './JobList';
import JobSearch from './JobSearch';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {

        const fetchItems = async () => {

            setIsLoading(true);

            try {
                const response = await axios.get(`/job`);
                console.log(response);
                setJobs(response.data);

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }

        fetchItems();

        setIsLoading(false);

    }, [])

    const filterJobs = (job) => {
        return job.full_name.includes(searchTerm);
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
                    <JobForm key={currentUser.id} user={currentUser} job={job} setJob={setJob} />
                </Col>
                <Col md={5}>
                    <>        {isLoading ? <>
                        < h1 > Loading ....</h1 >
                    </>
                        : <>
                            <JobSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <JobList
                                key={currentUser.id}
                                user={currentUser}
                                jobs={jobs.filter(job => filterJobs(job))}
                                job={job} setJob={setJob}
                                setErrMsg={setErrMsg}
                            />
                        </>
                    }</>
                </Col>
                <Col xs={1}></Col>

            </Row>

        </main>
    )
}

export default JobViewer;