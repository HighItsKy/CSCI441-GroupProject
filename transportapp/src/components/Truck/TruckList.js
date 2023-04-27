import { useState, useEffect } from 'react';
import React from 'react';
import axios from '../../api/axios';
import TruckForm from './TruckForm';


function TruckList({ user }) {

    const [trucks, setTrucks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const [truckId, setTruckId] = useState();
    const [showTruckForm, setShowTruckForm] = useState(false);

    useEffect(() => {

        const fetchItems = async () => {

            setIsLoading(true);

            try {
                const response = await axios.get(`/truck`);
                setTrucks(response.data);

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }

        fetchItems();

        setIsLoading(false);

    }, [])

    function handleClick(truckIdVal) {
        setTruckId(truckIdVal);
        setShowTruckForm(true);
    }

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
                        <div className="text-center">
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
                                        <tr onClick={() => handleClick(truck.truck_id)}>
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
                                                {truck.truck_capacity}
                                            </td>
                                            <td>
                                                {truck.truck_mileage}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <TruckForm
                            showTruckForm={showTruckForm}
                            setShowTruckForm={setShowTruckForm}
                            truckId={truckId}
                            setTruckId={setTruckId}
                        />
                    </div>

                </>
            }
        </>

    )
}

export default TruckList;