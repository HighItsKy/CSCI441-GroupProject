import React from 'react';
import { Button } from 'react-bootstrap';
import axios from '../../api/axios';

function JobListItem({ jobs, job, setJob, setErrMsg }) {

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
        <tr onClick={(e) => handleClick(job.invoice_id)}>
            <td><Button variant="primary" value={job.invoice_id} onClick={(e) => handleClick(e.currentTarget.value)} >{job.invoice_id}</Button></td>
            <td>{job.shipper_id}</td>
            <td>{job.driver_id}</td>
            <td>{job.full_name}</td>
            <td>{job.job_status}</td>
            <td>{job.date_of_order}</td>
        </tr>
    );
}

export default JobListItem;