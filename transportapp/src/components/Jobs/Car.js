import { Form, Accordion } from 'react-bootstrap';
import Drawing from "./Drawing";
import carImage from "./CarDiagram.jpeg";
import { useState } from 'react';
import AddVehicle from './addVehicle';

function Car({ car, index, allCars, getAllCars, changeCarVal, updateLineDrawing }) {

    const [showAddVehicle, setShowAddVehicle] = useState(false);

    const selectVehicle = (e) => {
        if (e.currentTarget.value === "add") {
            setShowAddVehicle(true);
            return
        }

        changeCarVal(e.currentTarget.id, e.currentTarget.value, index)
    }

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>Car {index}</Accordion.Header>
                    <Accordion.Body>
                        <AddVehicle
                            showAddVehicle={showAddVehicle}
                            setShowAddVehicle={setShowAddVehicle}
                            getAllCars={getAllCars}
                            changeCarVal={changeCarVal}
                            index={index}
                        />
                        <Form.Label htmlFor="vehicle_id">Car</Form.Label>
                        <Form.Select
                            id="vehicle_id"
                            value={car.vehicle_id}
                            onChange={(e) => selectVehicle(e)}

                        >
                            <option>Select a Car</option>
                            <option value="add">Add New Vehicle</option>
                            <> {allCars.map(vehicle => <option value={vehicle.vehicle_id}>{vehicle.vin} {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</option>)} </>
                        </Form.Select>
                        <Form.Label htmlFor={`vehicle_year`}>Year</Form.Label>
                        <Form.Control
                            id={`vehicle_year`}
                            plaintext readOnly
                            value={car.vehicle_year}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_make`}>Make</Form.Label>
                        <Form.Control
                            id={`vehicle_make`}
                            plaintext readOnly
                            value={car.vehicle_make}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_model`}>Model</Form.Label>
                        <Form.Control
                            id={`vehicle_model`}
                            plaintext readOnly
                            value={car.vehicle_model}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_color`}>Color</Form.Label>
                        <Form.Control
                            id={`vehicle_color`}
                            plaintext readOnly
                            value={car.vehicle_color}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vin`}>Serial No. (Last 8)</Form.Label>
                        <Form.Control
                            id={`vin`}
                            plaintext readOnly
                            value={car.vin}
                        ></Form.Control>
                        <Form.Label htmlFor={`notes`}>Notes</Form.Label>
                        <Form.Control
                            id={`notes`}
                            type="input"
                            value={car.notes}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}

                        ></Form.Control>
                        <Form.Label htmlFor={`shipping_cost`}>*Price</Form.Label>
                        <Form.Control
                            id={`shipping_cost`}
                            type="input"
                            value={car.shipping_cost}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                            required
                        ></Form.Control>
                        <Form.Label >Damage: </Form.Label>
                        <Drawing height="350" width="500" backgroundImage={carImage} imageData={car.line_drawing} setImageData={updateLineDrawing} index={index} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default Car;
