import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function TransmissionModel( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, transmissionReq] = React.useState(false);

    const LINK = 'http://127.0.0.1:8000/api/transmission_models/';

    var transmission_models_name = [];

    async function ReqTransmission(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        transmission_models_name.push(model.name);
    };

    transmission_models_name.unshift(' ---------------- ');

    if(requested === false){
        ReqTransmission().then(data => {setResponse(data)});
        transmissionReq(true);
    };

    const options = transmission_models_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleTransmissionModelChange = (event) => {
        setValueTrM(event.target.value);
        if('----------------' === event.target.value){
            onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let model = response1[i];
                if(model.name === event.target.value){
                    onChange(model.id);
                };
            };
        };  
    };

    const [valueTrM, setValueTrM] = useState('');

    
    return(
        <>
            <select value={valueTrM} onChange={handleTransmissionModelChange}>
                {options}
            </select>
        </>
    );
}

export default TransmissionModel;