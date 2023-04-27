import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../api/axios';
import { Button } from 'react-bootstrap';

function JobList({ user, job, setJob }) {
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

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`/job/${id}`);
            setJob(response.data[0]);
        } catch (err) {
            setErrMsg(JSON.stringify(err));
            return;
        }
    }

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
                            <td><Button variant="primary" value={job.invoice_id} onClick={(e) => handleClick(e.currentTarget.value)} >{job.invoice_id}</Button></td>
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