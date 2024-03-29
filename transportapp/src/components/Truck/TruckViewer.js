// import any components you want to use in this file:
import Navbar from '../Navbar';
import TransportHeader from '../header';
import TruckList from './TruckList';
import { useState } from 'react';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TruckViewer({ user }) {

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

    return (

        <main>
            <TransportHeader />

            <Navbar key={currentUser.id} user={currentUser} />

            <Row>
                <Col xs={1}></Col>
                <Col md={10}>
                    <TruckList />
                </Col>
                <Col xs={1}></Col>
            </Row>

        </main>

    )
}

export default TruckViewer;