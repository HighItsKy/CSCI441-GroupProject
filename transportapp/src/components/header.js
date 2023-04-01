import React from "react";
import "bootstrap/dist/css/bootstrap.css";

// in the function the return will show what the html will look like
function TransportHeader() {
    return (
        // made sure there is only one html tag at the top level of the return statement
        <>
            <div className="bg-image">
                <div className='d-flex justify-content-center align-items-center'>
                    <img src='images/transporterImage.png' className='img-fluid headerImage' alt='Car Transporter' />
                    <span className="overlay-text">Oklahoma Trucks Direct Transportation</span>
                </div>
            </div>
        </>

        // if i add another html tag here, then there would be two html tags at the top
        // level and we would get an error
        //<div Another html tag at the top level </div>
    );
}

// export the component so it can be used outside of this file
export default TransportHeader;
