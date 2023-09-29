import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function ControlledBridgeModel( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, controlledBridgeReq] = React.useState(false);

    const LINK = 'http://127.0.0.1:8000/api/controlled_bridge_models/';

    var controlled_bridge_models_name = [];

    async function ReqControlledBridge(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        controlled_bridge_models_name.push(model.name);
    }

    controlled_bridge_models_name.unshift(' ---------------- ');

    if(requested === false){
        ReqControlledBridge().then(data => {setResponse(data)});
        controlledBridgeReq(true);
    };

    const arOptions = controlled_bridge_models_name;

    const options = arOptions.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleControlledBridgeModelChange = (event) => {
        setValueCBM(event.target.value);
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

    const [valueCBM, setValueCBM] = useState('');


    return(
        <>
            <select value={valueCBM} onChange={handleControlledBridgeModelChange}>
                {options}
            </select>
        </>
    );
}

export default ControlledBridgeModel;