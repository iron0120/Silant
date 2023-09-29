import React from "react";
import axios from "axios";
import MachineFilterForm from "./MachineFilterForm";


function Clients ( props ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, clientReq] = React.useState(false);
    
    const LINK1 = 'http://127.0.0.1:8000/api/clients/';

    var client = [];
    
    async function ReqClient(){
        let response = await axios.get(LINK1);
        return response.data.results;
    };

    if(requested === false){
        ReqClient().then(data => {setResponse(data)});
        clientReq(true);
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        if(props.firstName === model.name){
            client = model;
            console.log(client)
        };
    };


    return(
        <>
           
        </>
    );
}

export default Clients;