import * as React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import GuideFactoryNumber from "./GuideFactoryNumber";
import GuideTechnicModel from "./GuideTechnicModel";
import GuideEngineModel from './GuideEngineModel';
import GuideTransmissionModel from './GuideTransmissionModel';
import GuideDrivingBridgeModel from './GuideDrivingBridgeModel.js';
import GuideControlledBridgeModel from './GuideControlledBridgeModel';
import GuideClient from './GuideClient';
import GuideServiceCompany from './GuideServiceCompanies';

import "../styles/Guides.css"


function GuidesMachine() {
    const params = useParams();
    const [response, setResponse] = React.useState([]);
    const [requested, machinesReq] = React.useState(false);


    const LINK = `http://127.0.0.1:8000/api/machines/`;

    let machine = [];

    function ReqMachines(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
        });
    };

    
    for(let i = 0; i < response.length; i+=1) {
        let technic = response[i];
        if(String(technic.id) === params.id){
            machine = technic;
            console.log(machine);
            console.log(machine.machine_factory_number)
        }; 
    };


    if(requested === false){
        ReqMachines();
        machinesReq(true);
    };
    

    return (
        <>
            <div className='links'>
                <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link>
                <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
            </div>
            <p>Справочники машины</p>
            <div className='guides'>
                <GuideFactoryNumber machine={machine} />
                <GuideTechnicModel machine={machine} />
                <GuideEngineModel machine={machine} />
                <GuideTransmissionModel machine={machine} />
                <GuideDrivingBridgeModel machine={machine} />
                <GuideControlledBridgeModel machine={machine} />
                <GuideClient machine={machine} />
                <GuideServiceCompany machine={machine} />
            </div>
        </> 
    );
}

export default GuidesMachine;