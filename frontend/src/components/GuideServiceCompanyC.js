import React from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table'


function GuideServiceCompanyC(props) {
    const [response1, setResponse] = React.useState([]);
    let [requested, serviceCompanyReq] = React.useState(false);
    
    const LINK = 'http://127.0.0.1:8000/api/service_companies/';

    var service_company = [];
    
    async function ReqServiceCompany(){
        let response = await axios.get(LINK);
        return response.data.results;
    };

    if(requested === false){
        ReqServiceCompany().then(data => {setResponse(data)});
        serviceCompanyReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.complaint.service_company === model.name){
            service_company = model;
        };
    };

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Название: {service_company.name}</td></tr>
                        <tr><td>Описание: {service_company.description}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideServiceCompanyC;