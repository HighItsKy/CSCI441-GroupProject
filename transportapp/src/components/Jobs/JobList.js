import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../api/axios';
import JobListItem from './JobListItem';
import { Table, Form, Button } from 'react-bootstrap';

function JobList({ user, jobs, job, setJob, setErrMsg }) {


    return (
        <section>
            <Table bordered hover>
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
                        <JobListItem job={job} setJob={setJob} setErrMsg={setErrMsg} />
                    ))}
                </tbody>
            </Table>
            <script>console.log(jobs)</script>
        </section>
    );
}

export default JobList;