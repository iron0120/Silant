import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideEngineModel(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, engineReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/engine_models/';

    var engine_model = [];
    
    async function ReqEngine(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqEngine().then(data => {setResponse(data)});
        engineReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.machine.engine_model === model.name){
            engine_model = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Модель двигателя</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Модель: {engine_model.name}</td></tr>
                        <tr><td>Описание: {engine_model.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideEngineModel;