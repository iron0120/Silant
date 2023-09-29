import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function EngineModel( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, engineReq] = React.useState(false);

    const LINK = 'http://127.0.0.1:8000/api/engine_models/';

    var engine_models_name = [];

    async function ReqEngine(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     
    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        engine_models_name.push(model.name);
    };

    engine_models_name.unshift(' ---------------- ');

    if(requested === false){
        ReqEngine().then(data => {setResponse(data)});
        engineReq(true);
    };

    const options = engine_models_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleEngineModelChange = (event) => {
        setvalueEM(event.target.value);
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

    const [valueEM, setvalueEM] = useState('');

    return(
        <>
            <select value={valueEM} onChange={handleEngineModelChange}>
                {options}
            </select>
        </>
    );
}

export default EngineModel;