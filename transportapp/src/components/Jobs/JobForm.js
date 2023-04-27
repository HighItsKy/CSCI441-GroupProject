import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import Car from './Car';


function JobForm({ job, setJob }) {

    return (

        <Form>
            <Form.Group>
                <Form.Label htmlFor="ID">Invoice No.</Form.Label>
                <Form.Control
                    id="ID"
                    type="text"
                    value={job.invoice_id}
                    placeholder=""
                    disabled
                />
                <Form.Label htmlFor="TransportDate">Date</Form.Label>
                <Form.Control
                    id="TransportDate"
                    type="date"
                    value={job.date_of_order}
                    placeholder=""
                    disabled
                    autoFocus
                    required>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <p>Ship From:</p>
                <Form.Label htmlFor="TransportFrom">Company</Form.Label>
                <Form.Control
                    id="TransportFrom"
                    type="text"
                    value={job.shipper_company}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportFromContactFName">Contact First Name</Form.Label>
                <Form.Control
                    id="TransportFromContactFName"
                    type="text"
                    value={job.shipper_first_name}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportFromContactLName">Contact Last Name</Form.Label>
                <Form.Control
                    id="TransportFromContactLName"
                    type="text"
                    value={job.shipper_last_name}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportFromAddress">Address</Form.Label>
                <Form.Control
                    id="TransportFromAddress"
                    type="text"
                    value={job.shipper_street}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportFromCityStateZip">City/State/Zip</Form.Label>
                <Form.Control
                    id="TransportFromCity"
                    type="text"
                    value={job.shipper_city}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Control
                    id="TransportFromState"
                    type="text"
                    value={job.shipper_state}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Control
                    id="TransportFromZip"
                    type="text"
                    value={job.shipper_zip}
                    placeholder=""
                    required>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ship To:</Form.Label>
                <Form.Label htmlFor="TransportTo">Company</Form.Label>
                <Form.Control
                    id="TransportTo"
                    type="text"
                    value={job.receiver_company}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportToContactFName">Contact First Name</Form.Label>
                <Form.Control
                    id="TransportToContactFName"
                    type="text"
                    value={job.receiver_first_name}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportToContactLName">Contact Last Name</Form.Label>
                <Form.Control
                    id="TransportToContactLName"
                    type="text"
                    value={job.receiver_last_name}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportToAddress">Address</Form.Label>
                <Form.Control
                    id="TransportToAddress"
                    type="text"
                    value={job.receiver_street}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Label htmlFor="TransportToCityStateZip">City/State/Zip</Form.Label>
                <Form.Control
                    id="TransportToCity"
                    type="text"
                    value={job.receiver_city}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Control
                    id="TransportToState"
                    type="text"
                    value={job.receiver_state}
                    placeholder=""
                    required>
                </Form.Control>
                <Form.Control
                    id="TransportToZip"
                    type="text"
                    value={job.receiver_zip}
                    placeholder=""
                    required>
                </Form.Control>
            </Form.Group>

            <Car />

            <Form.Group>
                <Form.Label>Driver's Signature: </Form.Label>

            </Form.Group>


            <Form.Group>
                <p>CONSIGNEE AGREES TO THE CONDITION OF THE VEHICLE, RATE, TERMS & CONDITIONS</p>
            </Form.Group>

            <Form.Group>
                <p>THE SHIPPER HAS SHIPPED THE ABOVE LISTED VEHICLE WITH THE ABOVE NOTED DAMAGE OR HAS
                    MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                <Form.Label>Shipper's Signature: </Form.Label>
            </Form.Group>

            <Form.Group>
                <p>THE RECEIVER HAS RECIEVED THE ABOVE LISTED VEHICLE WITH NO TRANSPORTATION DAMAGE NOTED OR HAS
                    MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
            </Form.Group>

            <Button Primary>Submit</Button>
            <Button Primary >Reset</Button>
            <Button Primary>Print Invoice</Button>

        </Form >
    )
}

export default JobForm;