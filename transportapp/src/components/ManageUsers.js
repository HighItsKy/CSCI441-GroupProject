import { useState } from 'react';
import React from 'react';
// import any components you want to use in this file:
import Navbar from './Navbar';
import TransportHeader from './header';
import UserList from './UserList';
import UserForm from './UserForm';
import { Button } from 'react-bootstrap';

function ManageUsers() {
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

    /* Determines whether the user wants to create a new user*/
    const [newButtonState, changeBtnState] = useState("closed");

    const [user, setUser] = useState({});

    /*Determines whether the user wants to search for a user instead*/
    let [searchStatus, search] = useState("false");

    return (
        <div>
            <TransportHeader />
            <Navbar key={currentUser.id} user={currentUser} />
            <div className="bodyHeading">
                <h1>MANAGE USERS
                    <Button onClick={() => {
                        if (newButtonState === "open") /*If the user already has the NEW USER clicked, and they click it again, then the form disappears*/
                            changeBtnState("closed");
                        else {
                            changeBtnState("open"); /*Shows the NEW USER form*/
                        }
                    }} variant="primary" size="lg">NEW USER</Button>
                    {/*<input type="text" placeholder="Search for user.." name="search" />*/}
                    <Button onClick={() => search("true")} variant="primary" size="lg">USER SEARCH</Button>
                </h1>
            </div>
            <div>
                {newButtonState === "open" ? (  /*If the admin is trying to create a new user*/
                    <>
                        <UserForm
                            user={user}
                            setUser={setUser}
                        />
                    </>
                )
                    : (
                        <>
                            {searchStatus === "false" /*If the admin has not clicked "NEW USER" or used the search bar*/
                                ?
                                <>
                                    <h3> Please choose an action.</h3>
                                </>
                                :
                                <>
                                    <UserList
                                    changeBtnState={changeBtnState}
                                    setUser={setUser}
                                    user={user}
                                    />
                                    {/*If the admin is trying to search for a new user*/}
                                </>
                            }
                        </>
                    )}
            </div>
        </div>

    );
}



export default ManageUsers;
