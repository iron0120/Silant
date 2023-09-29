import React from "react";
import axios from "axios";

import TechnicModelLink from "./TechnicModelLink";
import { Link } from "react-router-dom";


function TechnicModelGuide () {
    const [technicModel, setModel] = React.useState('');

    const handleTechicModelChange = (technicModel) => {
        setModel(technicModel);
        console.log(technicModel);
    };

    
    return(
        <>
            
            <TechnicModelLink onChange={handleTechicModelChange} />  
        </>
    );
}

export default TechnicModelGuide;