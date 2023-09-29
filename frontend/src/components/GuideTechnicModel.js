import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideTechnicModel(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, technicReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/technic_models/';

    var technic_model = [];
    
    async function ReqTechnic(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqTechnic().then(data => {setResponse(data)});
        technicReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.machine.technic_model === model.name){
            technic_model = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Модель техники</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Модель: {technic_model.name}</td></tr>
                        <tr><td>Описание: {technic_model.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideTechnicModel;