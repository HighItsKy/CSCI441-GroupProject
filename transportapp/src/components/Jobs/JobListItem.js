import React from 'react';
import { Button } from 'react-bootstrap';

function JobListItem({ job, getJob }) {

    return (
        <tr key={job.invoice_id} onClick={(e) => getJob(job.invoice_id)}>
            <td><Button variant="primary" value={job.invoice_id} onClick={(e) => getJob(e.currentTarget.value)} >{job.invoice_id}</Button></td>
            <td>{job.job_status}</td>
            <td>{job.date_of_order}</td>
            <td>{job.shipper_company}</td>
            <td>{job.receiver_company}</td>
        </tr>
    );
}

export default JobListItem;