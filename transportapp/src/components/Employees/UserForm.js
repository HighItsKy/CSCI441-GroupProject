import React from 'react';
import { useState } from 'react';

function UserForm({ user, setUser }) {

    return (
        <React.Fragment>
            <div className="form-container">
                <div className='employee-id'>
                    <label htmlFor='ID'>EMPLOYEE #</label>
                    <input className="form-control" id="ID" readOnly value={user.employee_id}></input>
                </div>
                <form className='employee-details' data-transport-order="form">
                    <div className='form-group'>
                        <label htmlFor='UserFName'>FIRST NAME</label>
                        <input type="text" className="form-control" id="UserFName" required value={user.employee_first_name}></input>
                        <label htmlFor='UserLName'>LAST NAME</label>
                        <input className="form-control" id="UserLName" required value={user.employee_last_name}></input>
                        <label htmlFor='Username'>USERNAME</label>
                        <input className="form-control" id="Username" required value={user.employee_username}></input>
                        <label htmlFor='UserPassword'>PASSWORD</label>
                        <input className="form-control" id="UserPassword" readOnly></input>
                        <label htmlFor='UserContactNo'>CONTACT #</label>
                        <input className="form-control" id="UserContactNo" required value={user.employee_contact_no}></input>
                        <label htmlFor='UserAddress'>STREET ADDRESS</label>
                        <input className="form-control" id="UserAddress" required value={user.employee_street_address}></input>
                        <label htmlFor='UserCity'>CITY</label>
                        <input className="form-control" id="UserCity" required value={user.employee_city}></input>
                        <label htmlFor='UserState'>STATE</label>
                        <input className="form-control" id="UserState" required value={user.employee_state}></input>
                        <label htmlFor='UserZip'>ZIP CODE</label>
                        <input className="form-control" id="UserZip" required value={user.employee_zip_code}></input>
                        <label htmlFor='UserEmail'>EMAIL</label>
                        <input className="form-control" id="UserEmail" required value={user.employee_email}></input>
                    </div>
                    <button type="save" className={"btn btn-primary"}>SAVE</button>
                    <button type="reset" className={"btn btn-primary"}>RESET</button>
                    <button type="deleteUser" className={"btn btn-primary"}>DELETE USER</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default UserForm; 