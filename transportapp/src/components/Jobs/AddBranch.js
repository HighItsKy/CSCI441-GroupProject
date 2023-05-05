import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../../api/axios';
import { useState } from 'react';


function AddBranch({ showAddBranch, setShowAddBranch, updateBranchInfo, changeVal, keyVal, jobVal }) {

    const [branchName, setBranchName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const [refreshed, setRefreshed] = useState(false);

    const handleClose = () => {
        setShowAddBranch(false);

    };

    const handleForm = async (e) => {
        e.preventDefault()
        //Add Company
        try {
            const branchVal = {
                branch_name: branchName,
                branch_contact_no: contactNo,
                branch_street_address: streetAddress,
                branch_city: city,
                branch_state: state,
                branch_zip_code: zip,
                branch_email: email
            }

            let data = JSON.stringify(branchVal);
            const response = await axios.post(`/company/${jobVal}/branches`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            updateBranchInfo();
            changeVal(keyVal, response.data[0].company_branch_id)

        } catch (err) {
            setErrMsg(JSON.stringify(err));
            return;
        }
        handleClose();
    }

    return (
        <>
            <Modal
                show={showAddBranch}
                onHide={handleClose}
                backdrop="static"
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Branch
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ?
                        <>
                            <div className="text-center mt-5">
                                {errMsg === "" ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <p>Error: {errMsg}</p>
                                }
                            </div>
                        </>

                        :
                        <>
                            <Form>

                                <Form.Label>Branch Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Branch Name"
                                    autoFocus
                                    value={branchName}
                                    onChange={(e) => setBranchName(e.target.value)}
                                    required
                                />
                                <Form.Label>Contact No:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Contact No"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    required
                                />
                                <Form.Label>Street Address:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                    required
                                />
                                <Form.Label>City:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                                <Form.Label>State:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                                <Form.Label>Zip:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Zip"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    required
                                />
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />



                                <Button type="reset" variant="secondary" onClick={(e) => handleClose(e)}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary" onClick={(e) => handleForm(e)}>
                                    Save Changes
                                </Button>
                            </Form>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </>
    );

}

export default AddBranch;