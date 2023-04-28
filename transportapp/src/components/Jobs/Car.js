import { Form, Accordion } from 'react-bootstrap';
import Drawing from "./Drawing";
import carImage from "./CarDiagram.jpeg";

function Car({ car, index, changeCarVal, updateLineDrawing }) {

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>Car {index}</Accordion.Header>
                    <Accordion.Body>
                        <Form.Label htmlFor={`vehicle_year`}>Year</Form.Label>
                        <Form.Control
                            id={`vehicle_year`}
                            type="input"
                            value={car.vehicle_year}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_make`}>Make</Form.Label>
                        <Form.Control
                            id={`vehicle_make`}
                            type="input"
                            value={car.vehicle_make}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, index)}
                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_model`}>Model</Form.Label>
                        <Form.Control
                            id={`vehicle_model`}
                            type="input"
                            value={car.vehicle_model}

                        ></Form.Control>
                        <Form.Label htmlFor={`vehicle_color`}>Color</Form.Label>
                        <Form.Control
                            id={`vehicle_color`}
                            type="input"
                            value={car.vehicle_color}
                        ></Form.Control>
                        <Form.Label htmlFor={`vin`}>Serial No. (Last 8)</Form.Label>
                        <Form.Control
                            id={`vin`}
                            type="input"
                            value={car.vin}
                        ></Form.Control>
                        <Form.Label htmlFor={`notes`}>Notes</Form.Label>
                        <Form.Control
                            id={`notes`}
                            type="input"
                            value={car.notes}
                        ></Form.Control>
                        <Form.Label htmlFor={`shipping_cost`}>Price</Form.Label>
                        <Form.Control
                            id={`shipping_cost`}
                            type="input"
                            value={car.shipping_cost}
                        ></Form.Control>
                        <Form.Label >Damage: </Form.Label>
                        <Drawing height="350" width="500" backgroundImage={carImage} imageDate={car.line_drawing} setImageData={updateLineDrawing} index={index} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default Car;
