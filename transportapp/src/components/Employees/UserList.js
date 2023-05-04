import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../api/axios';

function UserList({ changeBtnState, setUser, user }) {

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const fetchItem = async (userIdVal) => {

        if (userIdVal > 0) {

            try {
                const response = await axios.get(`/employee/${userIdVal}`);
                setUser(response.data[0]);

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }
    }

    const handleClick = (userIdVal) => {
        fetchItem(userIdVal);
        changeBtnState("open");
    };

    useEffect(() => {

        const fetchItems = async () => {

            setIsLoading(true);

            try {
                const response = await axios.get(`/employee`);
                setEmployees(response.data);

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
            setIsLoading(false);

        }

        fetchItems();

    }, []);

    return (
        <>
            {isLoading ?
                <>
                    <div className="text-center mt-5">
                        {errMsg === "" ?
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                            <p>Error: {errMsg}</p>
                        }
                    </div>
                </>
                :
                <>

                    <div className="container usersList">
                        <div className="text-center">
                            <h1>Users</h1>
                            <table className="table table-sm table-striped">
                                <colgroup>
                                    <col style={{ width: '20%' }}></col>
                                    <col style={{ width: '20%' }}></col>
                                    <col style={{ width: '20%' }}></col>
                                    <col style={{ width: '20%' }}></col>
                                    <col style={{ width: '20% ' }}></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <td>
                                            ID
                                        </td>
                                        <td>
                                            Username
                                        </td>
                                        <td>
                                            First Name
                                        </td>

                                        <td>
                                            Last Name
                                        </td>
                                        <td>
                                            Is Driver?
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr onClick={() => handleClick(employee.employee_id)}>
                                            <td>
                                                {employee.employee_id}
                                            </td>
                                            <td>
                                                {employee.employee_username}
                                            </td>
                                            <td>
                                                {employee.employee_first_name}
                                            </td>
                                            <td>
                                                {employee.employee_last_name}
                                            </td>

                                            <td>
                                                {employee.is_driver ? <span>&#x2713;</span> : ""}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </>
            }
        </>

    )
}

export default UserList;
