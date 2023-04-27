import { Link } from 'react-router-dom'
import { Form, FormGroup } from 'react-bootstrap';
import Car from './Car';


function JobForm({ job, setJob }) {

    return (

        <Form>
            <Form.Group>
                <Form.Label htmlFor="ID">Invoice No.</Form.Label>
                <Form.Control
                    type="text"
                    value={job.invoice_id}
                    placeholder=""
                    disabled
                />
                <Form.Label htmlFor="TransportDate">Date</Form.Label>
                <input type="date" className="form-control" ID="TransportDate" autoFocus required></input>
            </Form.Group>

            <Form.Group>
                <p>Ship From:</p>
                <label htmlFor="TransportFrom">Name</label>
                <input className="form-control" id="TransportFrom" required></input>
                <label htmlFor="TransportFromAddress">Address</label>
                <input className="form-control" id="TransportFromAddress" required></input>
                <label htmlFor="TransportFromCityStateZip">City/State/Zip</label>
                <input className="form-control" id="TransportFromCityStateZip" required></input>
            </Form.Group>
            <Form.Group>
                <label>Ship To:</label>
                <label htmlFor="TransportTo">Name</label>
                <input className="form-control" id="TransportTo" required></input>
                <label htmlFor="TransportToAddress">Address</label>
                <input className="form-control" id="TransportToAddress" required></input>
                <label htmlFor="TransportToCityStateZip">City/State/Zip</label>
                <input className="form-control" id="TransportToCityStateZip" required></input>
            </Form.Group>

            <Car />

            <div className="form-group">
                <label>Driver's Signature: </label>

            </div>


            <div className="form-group">
                <p>CONSIGNEE AGREES TO THE CONDITION OF THE VEHICLE, RATE, TERMS & CONDITIONS</p>
            </div>

            <div className="form-group">
                <p>THE SHIPPER HAS SHIPPED THE ABOVE LISTED VEHICLE WITH THE ABOVE NOTED DAMAGE OR HAS
                    MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                <label>Shipper's Signature: </label>
            </div>

            <div className="form-group">
                <p>THE RECEIVER HAS RECIEVED THE ABOVE LISTED VEHICLE WITH NO TRANSPORTATION DAMAGE NOTED OR HAS
                    MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
            </div>

            <button type="submit" className={"btn btn-primary"}>Submit</button>
            <button type="reset" className={"btn btn-primary"}>Reset</button>
            <button type="button" data-transport-order="reportButton" className={"btn btn-primary"}>Print Form</button>

        </Form >
    )
}

export default JobForm;