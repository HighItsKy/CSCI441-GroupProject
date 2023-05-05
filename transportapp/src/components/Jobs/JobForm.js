import { Link } from 'react-router-dom'
import { Form, Button, Row, OverlayTrigger } from 'react-bootstrap';
import { useState, useRef } from 'react';
import Car from './Car';
import Drawing from './Drawing';
import AddCompany from './AddCompany';
import AddBranch from './AddBranch';


function JobForm({
    job, cars,
    trucks, employees,
    companies, customers,
    shipperBranches, receiverBranches,
    allCars, addCar,
    changeVal, changeCarVal,
    updateLineDrawing,
    updateJob, resetJob,
    updateSignature, addCompanyValues,
    updateShipperBranches, updateReceiverBranches,
    getAllCars }) {

    //flags to show modal forms
    const [shipperAddCompany, setShipperAddCompany] = useState(false);
    const [shipperAddBranch, setShipperAddBranch] = useState(false);

    const [receiverAddCompany, setReceiverAddCompany] = useState(false);
    const [receiverAddBranch, setReceiverAddBranch] = useState(false);


    const selectShipperCompany = (e) => {

        if (e.currentTarget.value === "add") {
            setShipperAddCompany(true);
            return
        }

        changeVal(e.currentTarget.id, e.currentTarget.value);
        if (e.currentTarget.value) {
            changeVal('shipper_company', companies.find(company => company.company_id == e.currentTarget.value).company_name);
        }
        changeVal('shipper_branch_id', "");

    }

    const selectShipperBranch = (e) => {
        if (e.currentTarget.value === "add") {
            setShipperAddBranch(true);
            return
        }
        changeVal(e.currentTarget.id, e.currentTarget.value);
        if (e.currentTarget.value != 'add') {
            const branchVal = shipperBranches.find(branch => branch.company_branch_id == e.currentTarget.value)
            changeVal('shipper_street', branchVal.branch_street_address);
            changeVal('shipper_city', branchVal.branch_city);
            changeVal('shipper_state', branchVal.branch_state);
        }
    }

    const selectReceiverCompany = (e) => {
        if (e.currentTarget.value === "add") {
            setReceiverAddCompany(true);
            return
        }
        changeVal(e.currentTarget.id, e.currentTarget.value);
        if (e.currentTarget.value) {
            changeVal('receiver_company', companies.find(company => company.company_id == e.currentTarget.value).company_name);
        }
        changeVal('receiver_branch_id', "");

    }

    const selectReceiverBranch = (e) => {
        if (e.currentTarget.value === "add") {
            setReceiverAddBranch(true);
            return
        }
        changeVal(e.currentTarget.id, e.currentTarget.value);
        if (e.currentTarget.value != 'add') {
            const branchVal = receiverBranches.find(branch => branch.company_branch_id == e.currentTarget.value)
            changeVal('receiver_street', branchVal.branch_street_address);
            changeVal('receiver_city', branchVal.branch_city);
            changeVal('receiver_state', branchVal.branch_state);
        }
    }

    return (
        <>
            <Form onSubmit={updateJob} onReset={resetJob}>

                <Button className="m-2" type="reset" varient="primary">Start New Job</Button>

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
                    <Form.Label htmlFor="orderDate">*Date</Form.Label>
                    <Form.Control
                        id="date_of_order"
                        type="date"
                        value={job.date_of_order}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        autoFocus
                        required>
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group>
                    <h4>Ship From:</h4>

                    <Form.Label htmlFor="shipper_company_id">*Shipper</Form.Label>
                    <AddCompany showAddCompany={shipperAddCompany}
                        setShowAddCompany={setShipperAddCompany}
                        addCompanyValues={addCompanyValues}
                        changeVal={changeVal}
                        keyVal="shipper_company_id"
                    />
                    <Form.Select
                        id="shipper_company_id"
                        value={job.shipper_company_id}
                        onChange={(e) => selectShipperCompany(e)}
                        required
                    >
                        <option value="">Select a Company</option>
                        <> <option value="add">ADD NEW COMPANY</option></>
                        <> {companies.map(company => <option value={company.company_id}>{company.company_name}</option>)} </>
                    </Form.Select>
                    <Form.Control
                        id="shipper_id"
                        type="hidden"
                        value={job.shipper_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_company">Company</Form.Label>
                    <Form.Text
                        id="shipper_company"
                        value={job.shipper_company}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        plaintext readOnly
                    >
                    </Form.Text>
                    <Form.Label htmlFor="shipper_first_name">*Contact First Name</Form.Label>
                    <Form.Control
                        id="shipper_first_name"
                        value={job.shipper_first_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        required
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_last_name">*Contact Last Name</Form.Label>
                    <Form.Control
                        id="shipper_last_name"
                        value={job.shipper_last_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        required
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_branch_id">*Shipper Branch</Form.Label>
                    <AddBranch
                        showAddBranch={shipperAddBranch}
                        setShowAddBranch={setShipperAddBranch}
                        updateBranchInfo={updateShipperBranches}
                        changeVal={changeVal}
                        keyVal="shipper_branch_id"
                        jobVal={job.shipper_company_id}
                    />
                    <Form.Select
                        id="shipper_branch_id"
                        value={job.shipper_branch_id}
                        onChange={(e) => selectShipperBranch(e)}
                        required
                    >
                        <option>Select a Branch</option>
                        <>  {shipperBranches ? shipperBranches.map(branch => <option value={branch.company_branch_id}>{branch.branch_street_address} {branch.branch_city} {branch.branch_state}</option>) : <> </>} </>
                    </Form.Select>
                    <Form.Label htmlFor="shipper_street">Address</Form.Label>
                    <Form.Control
                        id="shipper_street"
                        value={job.shipper_street}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        plaintext readOnly
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_city">City</Form.Label>
                    <Form.Control
                        id="shipper_city"
                        value={job.shipper_city}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        plaintext readOnly
                    >
                    </Form.Control>
                    <Form.Label htmlFor="shipper_state">State</Form.Label>
                    <Form.Control
                        id="shipper_state"
                        value={job.shipper_state}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        plaintext readOnly
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group>
                    <h4>Ship To:</h4>
                    <Form.Label htmlFor="receiver_company_id">*Receiver</Form.Label>
                    <AddCompany showAddCompany={receiverAddCompany}
                        setShowAddCompany={setReceiverAddCompany}
                        addCompanyValues={addCompanyValues}
                        changeVal={changeVal}
                        keyVal="receiver_company_id"
                    />
                    <Form.Select
                        id="receiver_company_id"
                        value={job.receiver_company_id}
                        onChange={(e) => selectReceiverCompany(e)}
                        required
                    >
                        <option>Select a Company</option>
                        <> <option value="add">ADD NEW COMPANY</option></>
                        <> {companies.map(company => <option value={company.company_id}>{company.company_name}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="receiver_company">Company</Form.Label>
                    <Form.Control
                        id="receiver_company"
                        value={job.receiver_company}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        plaintext readOnly
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Control
                        id="receiver_id"
                        type="hidden"
                        value={job.receiver_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_first_name">*Contact First Name</Form.Label>
                    <Form.Control
                        id="receiver_first_name"
                        type="input"
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        value={job.receiver_first_name}
                        placeholder=""
                        required
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_last_name">*Contact Last Name</Form.Label>
                    <Form.Control
                        id="receiver_last_name"
                        type="input"
                        value={job.receiver_last_name}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        required
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_branch_id">*Receiver Branch</Form.Label>
                    <AddBranch
                        showAddBranch={receiverAddBranch}
                        setShowAddBranch={setReceiverAddBranch}
                        updateBranchInfo={updateReceiverBranches}
                        changeVal={changeVal}
                        keyVal="receiver_branch_id"
                        jobVal={job.receiver_company_id}
                    />
                    <Form.Select
                        id="receiver_branch_id"
                        value={job.receiver_branch_id}
                        onChange={(e) => selectReceiverBranch(e)}
                        required
                    >
                        <option>Select a Branch</option>
                        <option value="add">ADD NEW BRANCH</option>
                        <>  {receiverBranches ? receiverBranches.map(branch => <option value={branch.company_branch_id}>{branch.branch_street_address} {branch.branch_city} {branch.branch_state}</option>) : <> </>} </>
                    </Form.Select>
                    <Form.Label htmlFor="receiver_street">Address</Form.Label>
                    <Form.Control
                        id="receiver_street"
                        value={job.receiver_street}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        plaintext readOnly
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_city">City</Form.Label>
                    <Form.Control
                        id="receiver_city"
                        value={job.receiver_city}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        plaintext readOnly
                    >
                    </Form.Control>
                    <Form.Label htmlFor="receiver_state">State</Form.Label>
                    <Form.Control
                        id="receiver_state"
                        value={job.receiver_state}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        placeholder=""
                        plaintext readOnly
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="truck_id">*Truck</Form.Label>
                    <Form.Select
                        id="truck_id"
                        value={job.truck_id}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Select a Truck</option>
                        <> {trucks.map(truck => <option value={truck.truck_id}>{truck.truck_vin}</option>)} </>
                    </Form.Select>
                    <Form.Label htmlFor="intake_id">*Intake Employee</Form.Label>
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
                    <Form.Label htmlFor="intake_id">*Job Status</Form.Label>
                    <Form.Select
                        id="job_status"
                        value={job.job_status}
                        onChange={(e) => changeVal(e.currentTarget.id, e.currentTarget.value)}
                        required
                    >
                        <option>Pending</option>
                        <option>Loading</option>
                        <option>Enroute</option>
                        <option>Arrived</option>
                        <option>Unloaded</option>
                        <option>Complete</option>
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
                    <> {cars.map((car, index) => <Car car={car} allCars={allCars} index={index + 1} changeCarVal={changeCarVal}
                        updateLineDrawing={updateLineDrawing} getAllCars={getAllCars} />)} </>
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
