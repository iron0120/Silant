import React from "react";
import axios from "axios";




function TechnicModelLink ({onChange}, props) {
    const [valueTM, setValueTM] = React.useState(false);

    const handleTechicModelChange = () => {
        onChange(props.technic_model);
        setValueTM(true);
    };

    if(valueTM === false){
        handleTechicModelChange();
    };

    return(
        <> 
        </>
    );
};

export default TechnicModelLink;