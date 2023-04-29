import { Form, Accordion } from 'react-bootstrap';
import Drawing from "./Drawing";
import carImage from "./CarDiagram.jpeg";

function Car({ car, index, allCars, changeCarVal, updateLineDrawing }) {

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>Car {index}</Accordion.Header>
                    <Accordion.Body>
                        <Form.Label htmlFor="vehicle_id">Driver</Form.Label>
                        <Form.Select
                            id="vehicle_id"
                            value={car.vehicle_id}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                            required
                        >
                            <option>Select a Car</option>
                            <> {allCars.map(vehicle => <option value={vehicle.vehicle_id}>{vehicle.vin} {vehicle.vehicle_year} {vehicle.vehicle_make} {vehicle.vehicle_model}</option>)} </>
                        </Form.Select>
                        <Form.Label htmlFor={`vehicle_year`}>Year</Form.Label>
                        <Form.Control
                            id={`vehicle_year`}
                            type="text"
                            value={car.vehicle_year}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_make`}>Make</Form.Label>
                        <Form.Control
                            id={`vehicle_make`}
                            type="text"
                            value={car.vehicle_make}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_model`}>Model</Form.Label>
                        <Form.Control
                            id={`vehicle_model`}
                            type="text"
                            value={car.vehicle_model}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_color`}>Color</Form.Label>
                        <Form.Control
                            id={`vehicle_color`}
                            type="text"
                            value={car.vehicle_color}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vin`}>Serial No. (Last 8)</Form.Label>
                        <Form.Control
                            id={`vin`}
                            type="text"
                            value={car.vin}
                        ></Form.Control>
                        <Form.Label htmlFor={`notes`}>Notes</Form.Label>
                        <Form.Control
                            id={`notes`}
                            type="input"
                            value={car.notes}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}

                        ></Form.Control>
                        <Form.Label htmlFor={`shipping_cost`}>Price</Form.Label>
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
