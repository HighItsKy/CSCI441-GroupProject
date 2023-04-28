import { useState } from "react";
import { Form, Accordion } from 'react-bootstrap';
import Drawing from "./Drawing";
import carImage from "./CarDiagram.jpeg";

function Car({ car, index, changeCarVal }) {
    const [imageData, setImageData] = useState({});

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>Car {index}</Accordion.Header>
                    <Accordion.Body>
                        <Form.Label htmlFor={`vehicle_year`}>Year</Form.Label>
                        <Form.Control
                            id={`vehicle_year`}
                            indexNo={index - 1}
                            type="input"
                            value={car.vehicle_year}
                            onChange={(e) => changeCarVal(e.currentTarget.id, e.currentTarget.value, e.currentTarget.indexNo)}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Make`}>Make</Form.Label>
                        <Form.Control
                            id={`Car${index}Make`}
                            type="input"
                            value={car.vehicle_make}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Model`}>Model</Form.Label>
                        <Form.Control
                            id={`Car${index}Model`}
                            type="input"
                            value={car.vehicle_model}

                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Color`}>Color</Form.Label>
                        <Form.Control
                            id={`Car${index}Color`}
                            type="input"
                            value={car.vehicle_color}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Serial`}>Serial No. (Last 8)</Form.Label>
                        <Form.Control
                            id={`Car${index}Serial`}
                            type="input"
                            value={car.vin}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Notes`}>Notes</Form.Label>
                        <Form.Control
                            id={`Car${index}Stock`}
                            type="input"
                            value={car.notes}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Price`}>Price</Form.Label>
                        <Form.Control
                            id={`Car${index}Price`}
                            type="input"
                            value={car.shipping_cost}
                        ></Form.Control>
                        <Form.Label >Damage: </Form.Label>
                        <Drawing height="350" width="500" backgroundImage={carImage} setImageData={setImageData} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default Car;
