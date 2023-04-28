import React from 'react';
import JobListItem from './JobListItem';
import { Table } from 'react-bootstrap';

function JobList({ user, jobs, getJob }) {


    return (
        <section>
            <Table bordered hover>
                <thead>
                    <tr>
                        <td>Invoice#</td>
                        <td>Job Status</td>
                        <td>Date</td>
                        <td>Shipper</td>
                        <td>Receiver</td>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <JobListItem job={job} getJob={getJob} />
                    ))}
                </tbody>
            </Table>
            <script>console.log(jobs)</script>
        </section>
    );
}

export default JobList;