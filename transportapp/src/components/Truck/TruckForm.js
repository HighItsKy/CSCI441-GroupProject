import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from '../../api/axios';
import { useState } from 'react';


function TruckForm({ showTruckForm, setShowTruckForm, truckId, setTruckId }) {

    const [truckVin, setTruckVin] = useState("");
    const [truckMaxLoad, setTruckMaxLoad] = useState(0);
    const [truckCapacity, setTruckCapacity] = useState(0);
    const [truckMileage, setTruckMileage] = useState(0);


    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const [refreshed, setRefreshed] = useState(false);

    const handleClose = () => {
        setShowTruckForm(false);

        /*Refreshes the web page once, so the table is up to date after changes have been made and close has been invoked*/
        if (!refreshed) {
            window.location.reload();
            setRefreshed(true);
        }
    };

    const handleForm = async () => {
        if (truckId > 0) {
            try {
                const truck = { truck_id: truckId, truck_vin: truckVin, truck_max_load: truckMaxLoad, truck_capacity: truckCapacity, truck_mileage: truckMileage };
                let data = JSON.stringify(truck);
                const response = await axios.put('/truck', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                );
                fetchItem();

            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }

    }

    const fetchItem = async () => {

        setIsLoading(true);

        if (truckId) {
            try {
                const response = await axios.get('/truck/' + truckId);
                setTruckVin(response.data[0].truck_vin);
                setTruckCapacity(response.data[0].truck_capacity);
                setTruckMaxLoad(response.data[0].truck_max_load);
                setTruckMileage(response.data[0].truck_mileage);
            } catch (err) {
                setErrMsg(JSON.stringify(err));
                return;
            }
        }

        setIsLoading(false);
    }


    return (
        <>
            <Modal
                show={showTruckForm}
                onHide={handleClose}
                onShow={() => fetchItem(truckId)}
                size="lg"
                fullscreen="true"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Truck
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
                                <Form.Label>ID:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={truckId}
                                    placeholder=""
                                    disabled
                                />
                                <Form.Label>VIN:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="VIN"
                                    value={truckVin}
                                    onChange={(e) => setTruckVin(e.target.value)}
                                    autoFocus
                                />
                                <Form.Label>Max Load:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={truckMaxLoad}
                                    onChange={(e) => setTruckMaxLoad(e.target.value)}
                                    placeholder="Max Load"
                                />
                                <Form.Label>Capacity:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={truckCapacity}
                                    onChange={(e) => setTruckCapacity(e.target.value)}
                                    placeholder="Capacity"
                                />
                                <Form.Label>Mileage:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={truckMileage}
                                    onChange={(e) => setTruckMileage(e.target.value)}
                                    placeholder="Mileage"
                                />
                            </Form>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleForm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default TruckForm;
