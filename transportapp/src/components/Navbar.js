
// in the function the return will show what the html will look like
function Navbar() {
    return (
        // made sure there is only one html tag at the top level of the return statement
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Create Job</li>
            </ul>
        </nav>

        // if i add another html tag here, then there would be two html tags at the top
        // level and we would get an error
        //<div Another html tag at the top level </div>
    );
}

// export the component so it can be used outside of this file
export default Navbar;