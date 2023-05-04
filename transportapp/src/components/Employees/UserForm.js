import React from 'react';
import { useState } from 'react';
import axios from '../../api/axios';
import Form from 'react-bootstrap/Form';

function UserForm({ user, setUser }) {
    const [errMsg, setErrMsg] = useState("");

    const changeVal = async (key, value) => {
        setUser(user => ({ ...user, [key]: value }));
    }

    /*Determines whether the user being created is an admin*/
    let [isAdmin, setAdmin] = useState("true");
    /*Determines whether the user being created is a driver*/
    let [isDriver, setDriver] = useState("false");

    const handleForm = async (e) => {

        e.preventDefault();

        if (!user.employee_id) { //If the employee ID is blank, a new user is being added.
            try {
                const newUser = {
                    is_admin: isAdmin, is_driver: isDriver, employee_first_name: user.employee_first_name, employee_last_name: user.employee_last_name,
                    employee_username: user.employee_username, employee_contact_no: user.employee_contact_no,
                    employee_street_address: user.employee_street_address,
                    employee_city: user.employee_city, employee_state: user.employee_state, employee_zip_code: user.employee_zip_code,
                    employee_email: user.employee_email
                };
                let data = JSON.stringify(newUser);
                console.log(data);
                const response = await axios.post('/employee', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );
                //fetchItem();

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        } else {
            try {
                const newUser = {
                    employee_id: user.employee_id, is_admin: isAdmin, is_driver: isDriver, employee_first_name: user.employee_first_name, employee_last_name: user.employee_last_name,
                    employee_username: user.employee_username, employee_password: user.employee_password, employee_contact_no: user.employee_contact_no,
                    employee_street_address: user.employee_street_address,
                    employee_city: user.employee_city, employee_state: user.employee_state, employee_zip_code: user.employee_zip_code,
                    employee_email: user.employee_email
                };
                let data = JSON.stringify(newUser);
                console.log(data);
                const response = await axios.put('/employee', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );
                //fetchItem();

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }



    }

    return (

        <React.Fragment>
            {!errMsg ? <> {
                <div className="form-container">
                    <div className='employee-id'>
                        <label htmlFor='ID'>EMPLOYEE #</label>
                        <input className="form-control" id="ID" readOnly value={user.employee_id}></input>
                    </div>
                    <form className='employee-details' data-transport-order="form">
                        <div className='form-group'>
                            <label htmlFor='UserFName'>* FIRST NAME</label>
                            <input type="text" className="form-control" id="employee_first_name" required value={user.employee_first_name} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserLName'>* LAST NAME</label>
                            <input className="form-control" id="employee_last_name" required value={user.employee_last_name} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='Username'>* USERNAME</label>
                            <input className="form-control" id="employee_username" required value={user.employee_username} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserPassword'>PASSWORD</label>
                            <input className="form-control" id="UserPassword" readOnly></input>
                            <label htmlFor='UserContactNo'>* CONTACT #</label>
                            <input className="form-control" id="employee_contact_no" required value={user.employee_contact_no} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserAddress'> STREET ADDRESS</label>
                            <input className="form-control" id="employee_street_address" value={user.employee_street_address} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserCity'> CITY</label>
                            <input className="form-control" id="employee_city" value={user.employee_city} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserState'>STATE</label>
                            <input className="form-control" id="employee_state" value={user.employee_state} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserZip'>ZIP CODE</label>
                            <input className="form-control" id="employee_zip_code" value={user.employee_zip_code} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                            <label htmlFor='UserEmail'>EMAIL</label>
                            <input type="email" placeholder="example@gmail/yahoo.com" pattern=".+@(gmail|yahoo)\.com" className="form-control" id="employee_email" value={user.employee_email} onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}></input>
                        </div>
                        <Form>
                            {
                                <div key={`default-checkbox`} className="mb-3" >
                                    <Form.Check
                                        type={'checkbox'}
                                        onChange={() => {
                                            if (isAdmin === "false" && isDriver === "true") { //If the checkbox is already checked, user is Admin. 

                                            }
                                            else { //If the checkbox is already checked, user is Driver.
                                            }
                                        }
                                        }
                                        id={`default-checkbox`}
                                        label={`Is Driver`}
                                    />
                                </div>
                            }
                        </Form>
                        <button type="save" className={"btn btn-primary"} onClick={(e) => handleForm(e)}>SAVE</button>
                        <button type="reset" className={"btn btn-primary"}>RESET</button>
                        <button type="deleteUser" className={"btn btn-primary"}>DELETE USER</button>
                    </form>
                </div>

            }  </> : <>

                <h1>{errMsg}</h1>
            </>}
        </React.Fragment>
    )
}

export default UserForm; 
