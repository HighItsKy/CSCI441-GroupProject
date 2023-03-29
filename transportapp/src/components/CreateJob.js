import {Link} from 'react-router-dom'
// import any components you want to use in this file:
import Navbar from './Navbar';
import JobInfo from './JobInfo';


function CreateJob({  }) {
    return (
            
        <main>

            <div className="row">

                <div className="col-md-4">

                    <JobInfo />

                </div>
            </div>
        </main>

    )
}

export default CreateJob;