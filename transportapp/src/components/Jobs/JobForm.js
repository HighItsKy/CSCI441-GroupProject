import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap';
import Car from './Car';
import Drawing from './Drawing';


function JobForm({ job, cars, trucks, employees, customers, allCars, addCar, changeVal, changeCarVal, updateLineDrawing, updateJob, resetJob, updateSignature }) {

    return (
        <>
            <Form onSubmit={updateJob} onReset={resetJob}>
                <Form.Group>
                    <Form.Label htmlFor="invoice_id">Invoice No.</Form.Label>
                    <Form.Control
                        id="invoice_id"
                        type="text"
                        value={job.invoice_id}
                        placeholder=""
                        disabled
                        readOnly
                    />
                    <Form.Label htmlFor="orderDate">Date</Form.Label>
                    <Form.Control
                        id="date_of_order"
                        type="date"
                        value={job.date_of_order}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        autoFocus
                        required>
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group>
                    <h4>Ship From:</h4>
                    <Form.Label htmlFor="shipper_id">Shipper</Form.Label>
                    <Form.Select
                        id="shipper_id"
                        value={job.shipper_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Select a Customer</option>
                        <> {customers.map(customer => <option value={customer.customer_id}>{customer.customer_first_name} {customer.customer_last_name}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="shipper_company">Company</Form.Label>
                    <Form.Control
                        id="shipper_company"
                        type="input"
                        value={job.shipper_company}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_first_name">Contact First Name</Form.Label>
                    <Form.Control
                        id="shipper_first_name"
                        type="input"
                        value={job.shipper_first_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_last_name">Contact Last Name</Form.Label>
                    <Form.Control
                        id="shipper_last_name"
                        type="input"
                        value={job.shipper_last_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_street">Address</Form.Label>
                    <Form.Control
                        id="shipper_street"
                        type="input"
                        value={job.shipper_street}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_city">City</Form.Label>
                    <Form.Control
                        id="shipper_city"
                        type="input"
                        value={job.shipper_city}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_state">State</Form.Label>
                    <Form.Control
                        id="shipper_state"
                        type="input"
                        value={job.shipper_state}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_zip">Zip</Form.Label>
                    <Form.Control
                        id="shipper_zip"
                        type="input"
                        value={job.shipper_zip}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group>
                    <h4>Ship To:</h4>
                    <Form.Label htmlFor="receiver_id">Receiver</Form.Label>
                    <Form.Select
                        id="receiver_id"
                        value={job.receiver_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Select a Customer</option>
                        <> {customers.map(customer => <option value={customer.customer_id}>{customer.customer_first_name} {customer.customer_last_name}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="receiver_company">Company</Form.Label>
                    <Form.Control
                        id="receiver_company"
                        type="input"
                        value={job.receiver_company}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_first_name">Contact First Name</Form.Label>
                    <Form.Control
                        id="receiver_first_name"
                        type="input"
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        value={job.receiver_first_name}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_last_name">Contact Last Name</Form.Label>
                    <Form.Control
                        id="receiver_last_name"
                        type="input"
                        value={job.receiver_last_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_street">Address</Form.Label>
                    <Form.Control
                        id="receiver_street"
                        type="input"
                        value={job.receiver_street}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_city">City</Form.Label>
                    <Form.Control
                        id="receiver_city"
                        type="input"
                        value={job.receiver_city}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_state">State</Form.Label>
                    <Form.Control
                        id="receiver_state"
                        type="input"
                        value={job.receiver_state}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_zip">Zip</Form.Label>
                    <Form.Control
                        id="receiver_zip"
                        type="input"
                        value={job.receiver_zip}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="truck_id">Truck</Form.Label>
                    <Form.Select
                        id="truck_id"
                        value={job.truck_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Select a Truck</option>
                        <> {trucks.map(truck => <option value={truck.truck_id}>{truck.truck_vin}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="intake_id">Intake Employee</Form.Label>
                    <Form.Select
                        id="intake_id"
                        value={job.intake_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Select an Intake Employee</option>
                        <> {employees.map(employee => <option value={employee.employee_id}>{employee.employee_first_name} {employee.employee_last_name}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="driver_id">Driver</Form.Label>
                    <Form.Select
                        id="driver_id"
                        value={job.driver_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                    >
                        <option>Select a Driver</option>
                        <> {employees.filter(employee => employee.is_driver).map(employee => <option value={employee.employee_id}>{employee.employee_first_name} {employee.employee_last_name}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="special_instructions">Special Instructions</Form.Label>
                    <Form.Control
                        id="special_instructions"
                        type="input"
                        value={job.receiver_zip}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                </Form.Group>

                {cars ?
                    <> {cars.map((car, index) => <Car car={car} allCars={allCars} index={index + 1} changeCarVal={changeCarVal} updateLineDrawing={updateLineDrawing} />)} </>
                    : <>  </>
                }
                <Button variant="primary" type="button" className="m-4" onClick={addCar}>Add Car</Button>

                <Form.Group>
                    <Form.Label>Driver's Signature: </Form.Label>
                    <Drawing width="500" height="125" imageData={job.driver_signature} setImageData={updateSignature} backgroundImage={null} field={'driver_signature'} />
                </Form.Group>

                <Form.Group>
                    <p>THE SHIPPER HAS SHIPPED THE ABOVE LISTED VEHICLE WITH THE ABOVE NOTED DAMAGE OR HAS
                        MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                    <Form.Label>Shipper's Signature: </Form.Label>
                    <Drawing width="500" height="125" imageData={job.shipper_signature} setImageData={updateSignature} backgroundImage={null} field={'shipper_signature'} />
                </Form.Group>

                <Form.Group>
                    <p>THE RECEIVER HAS RECIEVED THE ABOVE LISTED VEHICLE WITH NO TRANSPORTATION DAMAGE NOTED OR HAS
                        MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                    {/*<Drawing width="600" height="125" imageData={job.receiver_signature} setImageData={updateSignature} field={'receiver_signature'}/>*/}
                </Form.Group>

                <Button className="m-2" type="submit" varient="primary">Submit</Button>
                <Button className="m-2" type="reset" varient="primary">Reset</Button>
                <Button className="m-2" varient="primary">Print Invoice</Button>

            </Form >
            <Row><br /></Row>
        </>
    )
}

export default JobForm;
