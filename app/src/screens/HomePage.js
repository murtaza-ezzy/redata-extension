import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function EnvironmentalImpact() {
    // Assuming these values are coming from a state or props
    const emailFootprint = 'A'; // Replace with actual value
    const streamingFootprint = 'B'; // Replace with actual value
    const carbonFootprint = 'X'; // Replace with actual value
    const totalTreesPlanted = 'Z'; // Replace with actual value
    const carbonFootprintOffset = 'P'; // Replace with actual value
    const inProgress = 'N'; // Replace with actual value

    return (
        <div className="container text-center mt-5">
            <div className="mt-4">
                <div className="row align-items-center my-3">
                    <div className="col"><i className="bi bi-envelope-fill"></i></div>
                    <div className="col">Emails/Browsing Footprint</div>
                    <div className="col">{emailFootprint} Kg of CO2e</div>
                </div>
                <div className="row align-items-center my-3">
                    <div className="col"><i className="bi bi-camera-video-fill"></i></div>
                    <div className="col">Streaming Footprint</div>
                    <div className="col">{streamingFootprint} Kg of CO2e</div>
                </div>
                <div className="row align-items-center my-3">
                    <div className="col"><i className="bi bi-tree-fill"></i></div>
                    <div className="col">Carbon Footprint</div>
                    <div className="col">{carbonFootprint} Kg of CO2e</div>
                </div>
                <div className="row align-items-center my-3">
                    <div className="col"><i className="bi bi-tree-fill"></i></div>
                    <div className="col">Total Trees Planted</div>
                    <div className="col">{totalTreesPlanted} In Progress = {inProgress}</div>
                </div>
                <div className="row align-items-center my-3">
                    <div className="col"><i className="bi bi-shield-fill"></i></div>
                    <div className="col">Carbon Footprint Offset</div>
                    <div className="col">{carbonFootprintOffset} Kg of CO2e</div>
                </div>
                <div className="mt-4">
                    <button className="btn btn-success">Plant Trees to Offset your Carbon Footprint</button>
                </div>
            </div>
        </div>
    );
}

export default EnvironmentalImpact;
