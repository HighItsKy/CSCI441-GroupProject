import { Form } from "react-bootstrap"

function JobSearch({ user, searchTerm, setSearchTerm }) {
    return (
        <>
            <Form>
                <Form.Label>Search:</Form.Label><Form.Control
                    id="searchFilter"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                >
                </Form.Control>
            </Form>
        </>
    );
}

export default JobSearch;