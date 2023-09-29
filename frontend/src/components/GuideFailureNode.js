import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideFailureNode(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, failureNodeReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/failure_nodes/';

    var failure_node = [];
    
    async function ReqFailureNode(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqFailureNode().then(data => {setResponse(data)});
        failureNodeReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.complaint.failure_node === model.name){
            failure_node = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Узел отказа</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Название: {failure_node.name}</td></tr>
                        <tr><td>Описание: {failure_node.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideFailureNode;