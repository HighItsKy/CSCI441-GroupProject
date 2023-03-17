
function JobList( {user} ) {

    // temp data to simulate data grabbed from the db
    let allJobs = [
        {
            invoiceID: 1,
            shipperID: 1001,
            driverID: 501,
            jobStatus: "Complete",
            dateOfOrder: "01/02/2023"
        },
        {
            invoiceID: 2,
            shipperID: 1002,
            driverID: null,
            jobStatus: "Pending",
            dateOfOrder: "03/01/2023"
        },
        {
            invoiceID: 3,
            shipperID: 1003,
            driverID: 501,
            jobStatus: "Pending",
            dateOfOrder: "03/02/2023"
        }
    ]


    
    console.log(user.id)
    let userJobs = allJobs
    // assuming all admin users have an id < 200
    // this will only filter jobs for users who are not admin
    if (user.id >= 200) {
        userJobs = allJobs.filter(job => job.driverID === user.id)
    }
    console.log(userJobs)


    return (
        <section>
                <table>
                    <thead>
                        <tr>
                            <td>Invoice#</td>
                            <td>Shipper#</td>
                            <td>Driver ID</td>
                            <td>Job Status</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                            {userJobs.map((job) => (
                                <tr>
                                    <td>{job.invoiceID}</td>
                                    <td>{job.shipperID}</td>
                                    <td>{job.driverID}</td>
                                    <td>{job.jobStatus}</td>
                                    <td>{job.dateOfOrder}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
        </section>

    );
}

export default JobList;