import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideTypeOfMaintenance(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, clientReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/types_of_maintenance/';

    var type_of_maintenance = [];
    
    async function ReqClient(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqClient().then(data => {setResponse(data)});
        clientReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.maintenance.type_of_maintenance === model.name){
            type_of_maintenance = model;
        };
    };

    return(
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Вид ТО</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Название: {type_of_maintenance.name}</td></tr>
                    <tr><td>Описание: {type_of_maintenance.description}</td></tr>
                </tbody>
            </Table>
        </>
    );
}

export default GuideTypeOfMaintenance;