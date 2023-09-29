import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function DrivingBridgeModel( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, drivingBridgeReq] = React.useState(false);

    const LINK = 'http://127.0.0.1:8000/api/driving_bridge_models/';

    var driving_bridge_models_name = [];

    async function ReqDrivingBridge(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        driving_bridge_models_name.push(model.name);
    };

    driving_bridge_models_name.unshift(' ---------------- ');

    if(requested === false){
        ReqDrivingBridge().then(data => {setResponse(data)});
        drivingBridgeReq(true);
    };

    const options = driving_bridge_models_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleDrivingBridgeModelChange = (event) => {
        setValueDBM(event.target.value);
        if('----------------' === event.target.value){
            onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let model = response1[i];
                if(model.name === event.target.value){
                    onChange(model.id);
                };
            };
        };
    };

    const [valueDBM, setValueDBM] = useState('');

    return(
        <>
            <select value={valueDBM} onChange={handleDrivingBridgeModelChange}>
                {options}
            </select>
        </>
    );
}

export default DrivingBridgeModel;