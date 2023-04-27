import { useState } from "react";
import { Form, Accordion } from 'react-bootstrap';
import Drawing from "./Drawing";

function Car({ car, index }) {
    const [imageData, setImageData] = useState({});

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>Car {index}</Accordion.Header>
                    <Accordion.Body>
                        <Form.Label htmlFor={`Car${index}Year`}>Year</Form.Label>
                        <Form.Control
                            id={`Car${index}Year`}
                            type="text"
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Make`}>Make</Form.Label>
                        <Form.Control
                            id={`Car${index}Make`}
                            type="text"
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Model`}>Model</Form.Label>
                        <Form.Control
                            id={`Car${index}Model`}
                            type="text"
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Color`}>Color</Form.Label>
                        <Form.Control
                            id={`Car${index}Color`}
                            type="text"
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Serial`}>Serial No. (Last 8)</Form.Label>
                        <Form.Control
                            id={`Car${index}Serial`}
                            type="text"
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Notes`}>Notes</Form.Label>
                        <Form.Control
                            id={`Car${index}Stock`}
                            type="text"
                            value={car.notes}
                        ></Form.Control>
                        <Form.Label htmlFor={`Car${index}Price`}>Price</Form.Label>
                        <Form.Control
                            id={`Car${index}Price`}
                            type="text"
                            value={car.shipping_cost}></Form.Control>
                        <Form.Label >Damage: </Form.Label>
                        <Drawing height="350" width="500" imageData={imageData} setImageData={setImageData} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
export default Car;
