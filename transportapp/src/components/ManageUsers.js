import { useState }from 'react';
import React from 'react';
// import any components you want to use in this file:
import Navbar from './Navbar';
import TransportHeader from './header';
import {Button} from 'react-bootstrap';

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
    const [ currentUser, setCurrentUser] = useState(adminUser);
    
    /* Determines whether the user wants to create a new user*/
    let [newButtonState, changeBtnState] = useState("closed");
    

    /*Determines whether the user wants to search for a user instead*/
    let [searchStatus, search] = useState("false")

    return (
        <div>
            <TransportHeader/>
            <Navbar key={currentUser.id} user={currentUser} />
            <div className="bodyHeading">
                <h1>MANAGE USERS 
                    <Button onClick={() => {
                        if(newButtonState == "open") /*If the user already has the NEW USER clicked, and they click it again, then the form disappears*/
                            changeBtnState("closed");
                        else{
                            changeBtnState("open"); /*Shows the NEW USER form*/
                        }}}variant="primary" size="lg">NEW USER</Button>
                    <input type="text" placeholder="Search for user.." name="search"/>
                    <Button onClick={() => search("true")} variant="primary" size="lg">SEARCH</Button>       
                </h1>
            </div>

            {newButtonState == "open" ? (  /*If the admin is trying to create a new user*/
                <React.Fragment>
                <div className="form-container">
                    <div className='employee-id'>
                        <label htmlFor='ID'>EMPLOYEE #</label>
                        <input className="form-control" id="ID" readOnly></input>
                    </div>
                    <form className='employee-details' data-transport-order="form">
                        <div className='form-group'>
                            <label htmlFor='UserFName'>FIRST NAME</label>
                            <input type="text" className="form-control" id="UserFName" required></input>
                            <label htmlFor='UserLName'>LAST NAME</label>
                            <input className="form-control" id="UserLName" required></input>
                            <label htmlFor='Username'>USERNAME</label>
                            <input className="form-control" id="Username" required></input>
                            <label htmlFor='UserPassword'>PASSWORD</label>
                            <input className="form-control" id="UserPassword" readOnly></input>
                            <label htmlFor='UserContactNo'>CONTACT #</label>
                            <input className="form-control" id="UserContactNo" required></input>
                            <label htmlFor='UserAddress'>STREET ADDRESS</label>
                            <input className="form-control" id="UserAddress" required></input>
                            <label htmlFor='UserCity'>CITY</label>
                            <input className="form-control" id="UserCity" required></input>
                            <label htmlFor='UserState'>STATE</label>
                            <input className="form-control" id="UserState" required></input>
                            <label htmlFor='UserZip'>ZIP CODE</label>
                            <input className="form-control" id="UserZip" required></input>
                            <label htmlFor='UserEmail'>EMAIL</label>
                            <input className="form-control" id="UserEmail" required></input>
                        </div>
                        <button type="save" className={"btn btn-primary"}>SAVE</button>
                        <button type="reset" className={"btn btn-primary"}>RESET</button>
                        <button type="deleteUser" className={"btn btn-primary"}>DELETE USER</button>
                    </form>
                </div>
                </React.Fragment>
                ):(  
                <React.Fragment>
                    {searchStatus == "false" 
                    ? (
                    <React.Fragment>{
                        /*If the admin has not clicked "NEW USER" or used the search bar*/
                        <h3> Please choose an action.</h3>
                    }</React.Fragment>
                    ):(
                    <React.Fragment>{
                        /*If the admin is trying to search for a new user*/
                        
                    }  
                    </React.Fragment>
                    )}
                </React.Fragment>
                )}

        </div>

    );
}



export default ManageUsers;
