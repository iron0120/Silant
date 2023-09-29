import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function MachineNumberM( props ) {
    const [response1, setResponse] = React.useState([]);
    let [requested, machineReq] = React.useState(false);
    const [valueM, setValueM] = React.useState('');
    const [machines, setMachines] = React.useState([]);


    const LINK = `http://127.0.0.1:8000/api/machines/?client=${props.user}&service_company=${props.servc}`;

    var machine_numbers = [];
    let first_machine = [];
    
    async function ReqMachine(){
        let response = await axios.get(LINK);
        setMachines(response.data.results);
        return response.data.results;
    };
     
    if(requested === false){
        ReqMachine().then(data => {setResponse(data)});
        machineReq(true);
    };

    for(let i=0; i < response1.length; i+=1){
        let model = response1[i];
        machine_numbers.push(model.machine_factory_number);
        first_machine = response1[0];
    };

    if(requested === true){
        props.handleMachinesChange(machines);
    };

    if(valueM === ''){
        // props.onChange(first_machine.id);
    }

    machine_numbers.unshift(' ---------------- ');

    const options = machine_numbers.map(
        (text, index) => {
            return <option key={index}>{text}</option>;
        }
    );

    const handleMachineChange = (event) => {
        setValueM(event.target.value);
        if('----------------' === event.target.value){
            // props.onChange(first_machine.id);
            props.onChange('');
        }else{
            for(let i=0; i < response1.length; i+=1){
                let model = response1[i];
                if(model.machine_factory_number === event.target.value){
                    props.onChange(model.id);
                };
            };
        };
    };


    return(
        <>
            <select value={valueM} onChange={handleMachineChange}>
                {options}
            </select>
        </>
    );
}

export default MachineNumberM;