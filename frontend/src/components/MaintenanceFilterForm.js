import React, {useState} from "react";
import axios from "axios";

import Maintenances from "./Maintenances"
import TypeOfMaintenance from "./TypeOfMaintenance";
import MachineNumberM from "./MachineNumberM";
import ServiceCompany from "./ServiceCompany";
import MachineButton from './MachineButton';

import { Link, useNavigate} from "react-router-dom";


function MaintenanceFilterForm(props) {
    const [valueToM, setValueToM] = useState('');
    const [valueM, setValueM] = useState('');
    const [valueSC, setValueSC] = useState('');
    const [machines, setMachines] = useState([]);
    const[machine_url, setMachine] = React.useState('');
    const[touch, setTouch] = React.useState(false);
    

    const handleTypeOfMaintenanceChange = (valueToM) => {
        setValueToM(valueToM);
    };


    const handleMachineChange = (valueM) => {
        setValueM(valueM);
    };


    const handleServiceCompanyChange = (valueSC) => {
        setValueSC(valueSC);
    };


    const handleMachinesChange = (machines) => {
        setMachines(machines);
        console.log(machines);
    };


    const handleMachineUrlChange = (machine_url) => {
        setMachine(machine_url);
        setTouch(true);
        console.log(machine_url);
    };





    return(
        <>
            <p>{props.role}: {props.firstName}</p>
            <div className="links">
                <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link>
                <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
            </div>
            {/* <p>Ваши машины:</p>
            <div>
                {machines.map((machine, index) => <MachineButton machine={machine} handleMachineUrlChange={handleMachineUrlChange} index={index} />)}
            </div> */}
            <form>
                <p>
                    <label>
                        Вид ТО:
                        <TypeOfMaintenance onChange={handleTypeOfMaintenanceChange} />
                    </label>
                </p>
                <p>
                    <label>
                        Зав. номер машины: 
                        <MachineNumberM onChange={handleMachineChange} user={props.user} handleMachinesChange={handleMachinesChange} servc={props.servc} />
                    </label>
                </p>
                <p>
                    <label>
                        Сервисная компания:
                        <ServiceCompany onChange={handleServiceCompanyChange} />
                    </label>
                </p>
            </form>
            <div>
                <Maintenances valueToM={valueToM} valueM={valueM} valueSC={valueSC} machines={machines} machine_url={machine_url} touch={touch} setTouch={setTouch} role={props.role} />
            </div>
        </>
    );
}

export default MaintenanceFilterForm;