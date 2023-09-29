import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideControlledBridgeModel(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, controlledBridgeReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/controlled_bridge_models/';

    var controlled_bridge_model = [];
    
    async function ReqControlledBridge(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqControlledBridge().then(data => {setResponse(data)});
        controlledBridgeReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.machine.controlled_bridge_model === model.name){
            controlled_bridge_model = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Модель управляемого моста</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Модель: {controlled_bridge_model.name}</td></tr>
                        <tr><td>Описание: {controlled_bridge_model.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideControlledBridgeModel;