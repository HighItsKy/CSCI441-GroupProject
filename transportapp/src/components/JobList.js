import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


function JobList( {user} ) {
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [jobs, setJobs] = useState([]);

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

    // temp data to simulate data grabbed from the db
    // let allJobs = [
    //     {
    //         invoiceID: 1,
    //         shipperID: 1001,
    //         driverID: 501,
    //         jobStatus: "Complete",
    //         dateOfOrder: "01/02/2023"
    //     },
    //     {
    //         invoiceID: 2,
    //         shipperID: 1002,
    //         driverID: null,
    //         jobStatus: "Pending",
    //         dateOfOrder: "03/01/2023"
    //     },
    //     {
    //         invoiceID: 3,
    //         shipperID: 1003,
    //         driverID: 501,
    //         jobStatus: "Pending",
    //         dateOfOrder: "03/02/2023"
    //     }
    // ]


    
    // console.log(user.id)
    // let userJobs = allJobs
    // // assuming all admin users have an id < 200
    // // this will only filter jobs for users who are not admin
    // if (user.id >= 200) {
    //     userJobs = allJobs.filter(job => job.driverID === user.id)
    // }
    // console.log(userJobs)


    return (
        <section>
                <table>
                    <thead>
                        <tr>
                            <td>Invoice#</td>
                            <td>Shipper#</td>
                            <td>Driver ID</td>
                            <td>Driver Name</td>
                            <td>Job Status</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                            {jobs.map((job) => (
                                <tr>

                                    {/*"Currently linked to TruckViewer until we have the job"*/}

                                    <td><Link to = "" className="btn btn-primary">{job.invoice_id}</Link></td>
                                    <td>{job.shipper_id}</td>
                                    <td>{job.driver_id}</td>
                                    <td>{job.full_name}</td>
                                    <td>{job.job_status}</td>
                                    <td>{job.date_of_order}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <script>console.log(jobs)</script>
        </section>

    );
}

export default JobList;