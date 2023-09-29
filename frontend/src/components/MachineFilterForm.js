import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Machines from "./Machines";
import AuthMachines from "./AuthMachines";
import TechnicModel from "./TechnicModel";
import EngineModel from "./EngineModel";
import TransmissionModel from "./TransmissionModel";
import DrivingBridgeModel from "./DrivingBridgeModel";
import ControlledBridgeModel from "./ControlledBridgeModel";
import Clients from "./Clients";

import '../styles/MachineFilterForm.css';


function MachineFilterForm(props) {
    const [valueTM, setValueTM] = useState('');
    const [valueEM, setValueEM] = useState('');
    const [valueTrM, setValueTrM] = useState('');
    const [valueDBM, setValueDBM] = useState('');
    const [valueCBM, setValueCBM] = useState('');
    
    
    const handleTechicModelChange = (valueTM) => {
        setValueTM(valueTM);
    };

    const handleEngineModelChange = (valueEM) => {
        setValueEM(valueEM);
    };

    const handleTransmissionModelChange = (valueTrM) => {
        setValueTrM(valueTrM);
    };

    const handleDrivingBridgeModelChange = (valueDBM) => {
        setValueDBM(valueDBM);
    };

    const handleControlledBridgeModelChange = (valueCBM) => {
        setValueCBM(valueCBM);
    };

    if(props.logined){
        return(
            <>
                <p>{props.role}: {props.firstName}</p>
                <div className="links">
                    <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                    <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                    <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link> 
                    <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
                </div>
                <form>
                    <p>
                        <label>
                            Модель техники:
                            <TechnicModel onChange={handleTechicModelChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Модель двигателя: 
                            <EngineModel onChange={handleEngineModelChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Модель трансмиссии: 
                            <TransmissionModel onChange={handleTransmissionModelChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Модель ведущего моста: 
                            <DrivingBridgeModel onChange={handleDrivingBridgeModelChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Модель управляемого моста: 
                            <ControlledBridgeModel onChange={handleControlledBridgeModelChange} />
                        </label>
                    </p>        
                </form>
                <div>
                    <AuthMachines 
                        valueTM={valueTM} 
                        valueEM={valueEM} 
                        valueTrM={valueTrM} 
                        valueDBM={valueDBM} 
                        valueCBM={valueCBM} 
                        logined={props.logined} 
                        firstName={props.firstName}
                        user={props.user}
                        role={props.role}
                        servc={props.servc}
                    />
                </div>
            </>
        );
    }else{
        return(
            <>
                <Machines />
            </>
        );
    };
}

export default MachineFilterForm;