import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Organization( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, technicReq] = React.useState(false);
    const [valueO, setValueO] = React.useState('');

    const LINK = 'http://127.0.0.1:8000/api/organizations/';

    var organization_name = [];

    async function ReqOrganization(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     

    if(requested === false){
        ReqOrganization().then(data => {setResponse(data)});
        technicReq(true);
    };
    

    for(let i=0; i < response1.length; i+=1){
        let organization = response1[i];
        organization_name.push(organization.name);
    };

    organization_name.unshift(' ------------------------------------------ ');

    const options = organization_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleOrganizationChange = (event) => {
        setValueO(event.target.value);
        if('------------------------------------------' === event.target.value){
            onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let organization = response1[i];
                if(organization.name === event.target.value){
                    onChange(organization.id);
                };
            };
        };
    };
    
    return(
        <>
            <select value={valueO} onChange={handleOrganizationChange}>
                {options}
            </select>
        </>
    );
}

export default Organization;