import { Button, Modal, Form } from 'react-bootstrap';
import axios from '../../api/axios';
import { useState } from 'react';


function AddCompany({ showAddCompany, setShowAddCompany, addCompanyValues, changeVal, keyVal }) {

    const [companyName, setCompanyName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleClose = (e) => {
        setShowAddCompany(false);
    };

    const handleForm = async (e) => {
        e.preventDefault()
        //Add Company
        try {
            const companyVal = { company_name: companyName };
            let data = JSON.stringify(companyVal);
            const response = await axios.post('/company', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            addCompanyValues(response.data[0].company_id, companyName);
            changeVal(keyVal, response.data[0].company_id)

        } catch (err) {
            setErrMsg(JSON.stringify(err));
            return;
        }
        handleClose();
    }

    return (
        <>
            <Modal
                show={showAddCompany}
                onHide={handleClose}
                backdrop="static"
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Company
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

                                <Form.Label>* Company Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Company Name"
                                    autoFocus
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
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

export default AddCompany;