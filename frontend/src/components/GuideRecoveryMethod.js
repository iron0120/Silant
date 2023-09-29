import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideRecoveryMethod(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, recoveryMethodReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/recovery_methods/';

    var recovery_method = [];
    
    async function ReqRecoveryMethod(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqRecoveryMethod().then(data => {setResponse(data)});
        recoveryMethodReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.complaint.recovery_method === model.name){
            recovery_method = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Способ восстановления</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Название: {recovery_method.name}</td></tr>
                        <tr><td>Описание: {recovery_method.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideRecoveryMethod;