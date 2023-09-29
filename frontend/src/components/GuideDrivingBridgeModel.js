import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideDrivingBridgeModel(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, drivingBridgeReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/driving_bridge_models/';

    var driving_bridge_model = [];
    
    async function ReqDrivingBridge(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqDrivingBridge().then(data => {setResponse(data)});
        drivingBridgeReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.machine.driving_bridge_model === model.name){
            driving_bridge_model = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Модель ведущего моста</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Модель: {driving_bridge_model.name}</td></tr>
                        <tr><td>Описание: {driving_bridge_model.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideDrivingBridgeModel;