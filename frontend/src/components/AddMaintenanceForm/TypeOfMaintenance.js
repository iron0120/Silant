import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function TypeOfMaintenance( {onChange} ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, typeOfMaintenanceReq] = React.useState(false);
    const [valueToM, setValueToM] = React.useState('');

    const LINK = 'http://127.0.0.1:8000/api/types_of_maintenance/';

    var type_of_maintenance_name = [];

    async function ReqTypeOfMaintenance(){
        let response = await axios.get(LINK);
        return response.data.results;
    };
     
    if(requested === false){
        ReqTypeOfMaintenance().then(data => {setResponse(data)});
        typeOfMaintenanceReq(true);
    };

    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        type_of_maintenance_name.push(model.name);
    };

    type_of_maintenance_name.unshift(' ---------------- ');

    const options = type_of_maintenance_name.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleTypeOfMaintenanceChange = (event) => {
        setValueToM(event.target.value);
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
            <select value={valueToM} onChange={handleTypeOfMaintenanceChange}>
                {options}
            </select>
        </>
    );
}

export default TypeOfMaintenance;