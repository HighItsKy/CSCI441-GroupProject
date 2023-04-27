// import any components you want to use in this file:
import Navbar from '../Navbar';
import JobForm from './JobForm';
import TransportHeader from '../header';
import JobList from './JobList';
import { useState } from 'react';
import React from 'react';

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

    return (

        <main>

            <TransportHeader />

            <Navbar key={currentUser.id} user={currentUser} />

            {/*If the user is an admin user then it shows the Form to create the job
               Otherwise the user just sees the jobs for them
              */}

            <React.Fragment>

                <div className="row">
                    <div className="col-md-6">
                        <JobForm job={job} setJob={setJob} />
                    </div>
                    <div className="col-md-6">
                        <JobList key={currentUser.id} user={currentUser} job={job} setJob={setJob} />
                    </div>
                </div>
            </React.Fragment>

        </main>

    )
}

export default JobViewer;