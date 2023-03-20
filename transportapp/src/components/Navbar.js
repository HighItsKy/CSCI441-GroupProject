import { Link } from 'react-router-dom'


// in the function the return will show what the html will look like
function Navbar( {user} ) {

    let adminLinks = ["View Jobs", "Add Job", "Edit Job", "Manage Users", "Account Settings"]
    let driverLinks = ["View Jobs", "Edit Job", "Account Settings"]

    // use adminLinks if isAdmin is true, use driverLinks otherwise
    let linksToUse = user.isAdmin ? adminLinks : driverLinks

    return (
        // made sure there is only one html tag at the top level of the return statement
        <nav>
                <Link to="about">About</Link>
                {/* loop through our array and create a <li> element for each item */}
                {linksToUse.map((link) => (
                    <Link>{link}</Link>
                ))}
        </nav>

        // if i add another html tag here, then there would be two html tags at the top
        // level and we would get an error
        //<div Another html tag at the top level </div>
    );
}

// export the component so it can be used outside of this file
export default Navbar;