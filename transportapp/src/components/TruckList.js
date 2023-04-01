import JobList from './JobList';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../api/axios';


function TruckList({ user }) {

    const [trucks, setTrucks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {

        const fetchItems = async () => {

            setIsLoading(true);

            try {
                const response = await axios.get(`/truck`);
                console.log(response);
                setTrucks(response.data);

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }

        fetchItems();

        setIsLoading(false);

    }, [])

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
                    <div className="container">
                        <div className="text-center mt-5">
                            <h1>TRUCKS</h1>
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
                                            VIN
                                        </td>
                                        <td>
                                            Max Load
                                        </td>

                                        <td>
                                            Capacity
                                        </td>
                                        <td>
                                            Mileage
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trucks.map((truck) => (
                                        <tr>
                                            <td>
                                                {truck.truck_id}
                                            </td>
                                            <td>
                                                {truck.truck_vin}
                                            </td>
                                            <td>
                                                {truck.truck_max_load}
                                            </td>
                                            <td>
                                                {truck.truck_capcity}
                                            </td>
                                            <td>
                                                {truck.truck_mileage}
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

export default TruckList;