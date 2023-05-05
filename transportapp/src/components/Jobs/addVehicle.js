import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../../api/axios';
import { useState } from 'react';


function AddVehicle({ showAddVehicle, setShowAddVehicle, getAllCars, changeCarVal, index }) {

    const [vin, setVIN] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const [refreshed, setRefreshed] = useState(false);

    const handleClose = () => {
        setShowAddVehicle(false);

    };

    const handleForm = async (e) => {
        e.preventDefault()
        //Add Company
        try {
            const vehicleVal = {
                vin: vin,
                vehicle_color: color,
                vehicle_make: make,
                vehicle_model: model,
                vehicle_year: year
            }

            let data = JSON.stringify(vehicleVal);
            console.log(data);
            const response = await axios.post(`vehicle`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            getAllCars();

        } catch (err) {
            setErrMsg(JSON.stringify(err));
            return;
        }
        handleClose();
    }

    return (
        <>
            <Modal
                show={showAddVehicle}
                onHide={handleClose}
                backdrop="static"
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Branch
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            <Form>

                                <Form.Label>VIN</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="VIN"
                                    autoFocus
                                    value={vin}
                                    onChange={(e) => setVIN(e.target.value)}
                                    required
                                />
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                                <Form.Label>Make</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Make"
                                    value={make}
                                    onChange={(e) => setMake(e.target.value)}
                                    required
                                />
                                <Form.Label>Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    required
                                />
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    required
                                />
                                <Button type="reset" variant="secondary" onClick={(e) => handleClose(e)}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary" onClick={(e) => handleForm(e)}>
                                    Save Changes
                                </Button>
                            </Form>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </>
    );

}

export default AddVehicle;