import { useState } from "react";
import { Form } from 'react-bootstrap';
import Drawing from "./Drawing";

function Car({ job, setJob }) {
    const [imageData, setImageData] = useState({});

    return (
        <>
            <Form.Group>
                <p>Car</p>
                <Form.Label htmlFor="Car1Year">Year</Form.Label>
                <Form.Control id="Car1Year"></Form.Control>
                <Form.Label htmlFor="Car1Make">Make</Form.Label>
                <Form.Control id="Car1Make"></Form.Control>
                <Form.Label htmlFor="Car1Model">Model</Form.Label>
                <Form.Control id="Car1Model"></Form.Control>
                <Form.Label htmlFor="Car1Color">Color</Form.Label>
                <Form.Control id="Car1Color"></Form.Control>
                <Form.Label htmlFor="Car1Serial">Serial No. (Last 8)</Form.Label>
                <Form.Control id="Car1Serial"></Form.Control>
                <Form.Label htmlFor="Car1Stock">Stock No.</Form.Label>
                <Form.Control id="Car1Stock"></Form.Control>
                <Form.Label htmlFor="Car1Price">Price</Form.Label>
                <Form.Control id="Car1Price"></Form.Control>
                <Form.Label >Damage: </Form.Label>
                <Drawing height="100" width="100" imageData={imageData} setImageData={setImageData} />
            </Form.Group>
        </>
    )
}
export default Car;
