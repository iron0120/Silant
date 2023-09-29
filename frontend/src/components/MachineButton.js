import React from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../styles/MachineButton.css";


function MachineButton(props) {
    const handleChange = (e) => {
        props.handleMachineUrlChange(props.machine.id)
    };

    return(
        <>
            <div className="buttons">
                <p>Машина {props.index + 1}:</p>
                <button onClick={handleChange} >
                    {props.machine.machine_factory_number}
                </button>   
            </div>  
        </>
    );
}

export default MachineButton;