import React from "react";
import axios from "axios";


function TechnicModel ( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, technicReq] = React.useState(false);
    const [valueTM, setValueTM] = React.useState('');
    
    const LINK = 'http://127.0.0.1:8000/api/technic_models/';

    var technic_models_name = [];
    
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
        technic_models_name.push(model.name);
    };

    technic_models_name.unshift(' ---------------- ');

    const options = technic_models_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleTechicModelChange = (event) => {
        setValueTM(event.target.value);
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
    
    
    return(
        <>
            <select value={valueTM} onChange={handleTechicModelChange}>
                {options}
            </select>
        </>
    );
}

export default TechnicModel;