// import any components you want to use in this file:
import Navbar from '../Navbar';
import UserForm from './AccountSettingsUserForm';
import TransportHeader from '../header';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import AccountSettingsUserForm from './AccountSettingsUserForm';
import { Button } from 'react-bootstrap';

function AccountSettings() {

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

    const [user, setUser] = useState({});
    return (

        <main>

            <TransportHeader />

            <Navbar key={currentUser.id} user={currentUser} />

            {/*If the user is an admin user then it shows the Form to create the job
               Otherwise the user just sees the jobs for them
              */}

            <div className="bodyHeading">
                <h1>ACCOUNT SETTINGS</h1>
            </div>
            <>
                <AccountSettingsUserForm
                    user={currentUser}
                    setUser={setUser}
                />
            </>

        </main>

    )
}

export default AccountSettings;
