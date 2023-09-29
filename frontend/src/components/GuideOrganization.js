import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideOrganization(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, organizationReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/organizations/';

    var organization = [];
    
    async function ReqOrganization(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqOrganization().then(data => {setResponse(data)});
        organizationReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.maintenance.organization === model.name){
            organization = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Организация, проводившая ТО</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Название: {organization.name}</td></tr>
                        <tr><td>Описание: {organization.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideOrganization;