import React from "react";
import axios from "axios";

import EngineModel from "./EngineModel";
import TransmissionModel from "./TransmissionModel";
import DrivingBridgeModel from "./DrivingBridgeModel";
import ControlledBridgeModel from "./ControlledBridgeModel";
import ServiceCompany from "./ServiceCompany";
import { Link, useNavigate } from "react-router-dom";
import Guides from "./Guides";




function GM(props) {
    let techic_model = props.techic_model;
    console.log(props.techic_model);
    // const [valueTM, setValueTM] = React.useState(false);

    // const handleTechicModelChange = () => {
    //     props.onChange(props.techic_model);
    //     setValueTM(true);
    // };


    return(
        <>
            {/* <Guides/> */}
        </>
    );
}

export default GM;