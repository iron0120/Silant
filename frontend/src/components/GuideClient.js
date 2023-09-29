import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideClient(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, clientReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/clients/';

    var client = [];
    
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
        if(props.machine.client === model.name){
            client = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Клиент</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Название: {client.name}</td></tr>
                        <tr><td>Описание: {client.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideClient;