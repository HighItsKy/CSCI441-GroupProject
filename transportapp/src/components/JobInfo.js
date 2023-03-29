import { Link } from 'react-router-dom'

function JobInfo() {
 
    return (

        <form data-transport-order="form">

            <div className="form-group">
                    <label htmlFor='ID'>Invoice No.</label>
                    <input className="form-control" id="ID" readOnly></input>
                    <label htmlFor="TransportDate">Date</label>
                    <input type="date" className="form-control" ID="TransportDate" autoFocus required></input>
            </div>

            <div className="form-group">
                <p>Ship From:</p>
                <label htmlFor="TransportFrom">Name</label>
                <input className="form-control" id="TransportFrom" required></input>
                <label htmlFor="TransportFromAddress">Address</label>
                <input className="form-control" id="TransportFromAddress" required></input>
                <label htmlFor="TransportFromCityStateZip">City/State/Zip</label>
                <input className="form-control" id="TransportFromCityStateZip" required></input>
            </div>

            <div className="form-group">
                <label>Ship To:</label>
                <label htmlFor="TransportTo">Name</label>
                <input className="form-control" id="TransportTo" required></input>
                <label htmlFor="TransportToAddress">Address</label>
                <input className="form-control" id="TransportToAddress" required></input>
                <label htmlFor="TransportToCityStateZip">City/State/Zip</label>
                <input className="form-control" id="TransportToCityStateZip" required></input>
            </div>

            <div className="form-group">
                <p>Car 1:</p>
                <label htmlFor="Car1Year">Year</label>
                <input className="form-control" id="Car1Year"></input>
                <label htmlFor="Car1Make">Make</label>
                <input className="form-control" id="Car1Make"></input>
                <label htmlFor="Car1Model">Model</label>
                <input className="form-control" id="Car1Model"></input>
                <label htmlFor="Car1Color">Color</label>
                <input className="form-control" id="Car1Color"></input>
                <label htmlFor="Car1Serial">Serial No. (Last 8)</label>
                <input className="form-control" id="Car1Serial"></input>
                <label htmlFor="Car1Stock">Stock No.</label>
                <input className="form-control" id="Car1Stock"></input>
                <label htmlFor="Car1Price">Price</label>
                <input className="form-control" id="Car1Price"></input>

                <label >Damage: </label>
 
             {/*  
                <Canvas width="500" height="350" setImgData={ setCar1Data } originalImage={ car1Pic }  />
                <input  type="hidden" 
                        id="Car1Img" 
                        value={car1Data}
                ></input>   
             */}

            </div>
            
            <div className="form-group">
                <label>Driver's Signature: </label>
            {/*

                <Canvas width="600" height="125" setImgData={ setDriverImg } originalImage={ driverPic }/>
                <input type="hidden" id="DriverImg" value={driverImg}></input>

            */}

            </div>


            <div className="form-group">
                <p>CONSIGNEE AGREES TO THE CONDITION OF THE VEHICLE, RATE, TERMS & CONDITIONS</p>
            </div>

            <div className="form-group">
                <p>THE SHIPPER HAS SHIPPED THE ABOVE LISTED VEHICLE WITH THE ABOVE NOTED DAMAGE OR HAS
                MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                <label>Shipper's Signature: </label>
                {/*
                <Canvas width="600" height="125" setImgData={ setShipperImg } originalImage={ shipperPic }/>                
                <input type="hidden" id="ShipperImg" value={shipperImg}></input>
                <label htmlFor="ShipperDate">Date:</label>
                <input type="date" className="form-control" id="ShipperDate"></input>
                */}
            </div>

            <div className="form-group">
                <p>THE RECEIVER HAS RECIEVED THE ABOVE LISTED VEHICLE WITH NO TRANSPORTATION DAMAGE NOTED OR HAS
                MADE SUCH EXCEPTIONS ON INSPECTION SHEETS</p>
                {/*
                <Canvas width="600" height="125" setImgData={ setReceiverImg } originalImage={ receiverPic }/>                
                <input type="hidden" id="ReceiverImg" value={ReceiverImg}></input>
                <label htmlFor="ReceiverDate">Date:</label>
                <input type="date" className="form-control" id="ReceiverDate"></input>
                */}
            </div>

            <button type="submit" className={"btn btn-primary"}>Submit</button>
            <button type="reset" className={"btn btn-primary"}>Reset</button>
            <button type="button" data-transport-order="reportButton" className={"btn btn-primary"}>Print Form</button>

        </form>
    )
}

export default JobInfo