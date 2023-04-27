import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import React from 'react';

function AccountSettingsUserForm({ user, setUser }) {
    return (
        <React.Fragment>
            <div className="form-container">
                <div className='employee-id'>
                    <label htmlFor='ID'>EMPLOYEE #</label>
                    <input className="form-control" id="ID" readOnly value={user.id}></input>
                </div>
                <form className='employee-details' data-transport-order="form">
                    <div className='form-group'>
                        <label htmlFor='UserFName'>FIRST NAME</label>
                        <input type="text" className="form-control" id="UserFName" required value={user.firstName}></input>
                        <label htmlFor='UserLName'>LAST NAME</label>
                        <input className="form-control" id="UserLName" required value={user.lastName}></input>
                        <label htmlFor='Username'>USERNAME</label>
                        <input className="form-control" id="Username" required value={user.username}></input>
                        <label htmlFor='UserPassword'>PASSWORD</label>
                        <input className="form-control" id="UserPassword" readOnly value={user.password}></input>
                        <label htmlFor='UserContactNo'>CONTACT #</label>
                        <input className="form-control" id="UserContactNo" required value={user.phone}></input>
                        <label htmlFor='UserAddress'>STREET ADDRESS</label>
                        <input className="form-control" id="UserAddress" required value={user.streetAddress}></input>
                        <label htmlFor='UserCity'>CITY</label>
                        <input className="form-control" id="UserCity" required value={user.city}></input>
                        <label htmlFor='UserState'>STATE</label>
                        <input className="form-control" id="UserState" required value={user.state}></input>
                        <label htmlFor='UserZip'>ZIP CODE</label>
                        <input className="form-control" id="UserZip" required value={user.zipcode}></input>
                        <label htmlFor='UserEmail'>EMAIL</label>
                        <input className="form-control" id="UserEmail" required value={user.email}></input>
                    </div>
                    <button type="save" className={"btn btn-primary"}>SAVE</button>
                    <button type="reset" className={"btn btn-primary"}>RESET</button>
                    <button type="deleteUser" className={"btn btn-primary"}>DELETE USER</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default AccountSettingsUserForm;
