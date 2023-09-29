import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideTransmissionModel(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, transmissionReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/transmission_models/';

    var transmission_model = [];
    
    async function ReqTransmission(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqTransmission().then(data => {setResponse(data)});
        transmissionReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.machine.transmission_model === model.name){
            transmission_model = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Модель трансмисии</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Модель: {transmission_model.name}</td></tr>
                        <tr><td>Описание: {transmission_model.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideTransmissionModel;