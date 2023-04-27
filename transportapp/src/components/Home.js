import { useState } from 'react';
// import any components you want to use in this file:
import Navbar from './Navbar';
import JobList from './Jobs/JobList';
import JobForm from './Jobs/JobForm';
import TransportHeader from './header';
import { Col, Row } from 'react-bootstrap';

function Home() {



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
    const [currentUser, setCurrentUser] = useState(driverUser)




    return (
        <>
            <TransportHeader />
            <Navbar key={currentUser.id} user={currentUser} />
            <main>
                {/* pass adminUser data if you want to see what the admin would show */}
                <Row>
                    <Col xs={1}></Col>
                    <Col md={5}>
                        <JobForm job={job} setJob={setJob} />
                    </Col>
                    <Col md={5}>
                        <JobList key={currentUser.id} user={currentUser} job={job} setJob={setJob} />
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </main>
        </>
    );
}

export default Home;
