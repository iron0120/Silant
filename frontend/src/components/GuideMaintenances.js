import * as React from 'react';
import axios from 'axios';
import { useParams, Link,} from 'react-router-dom';


import GuideTypeOfMaintenance from './GuideTypeOfMaintenance';
import GuideOrganization from './GuideOrganization';
import GuideServiceCompanyM from './GuideServiceCompanyM';

import "../styles/Guides.css"


function GuidesMaintenances() {
    const params = useParams();
    const [response, setResponse] = React.useState([]);
    let [requested, maintenanceReq] = React.useState(false);
  
    const LINK = `http://127.0.0.1:8000/api/maintenances/`;

    let maintenance = [];
    

    function ReqMaintenances(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            
        });
    };


    for(let i = 0; i < response.length; i+=1) {
        let req = response[i];
        if(String(req.id) === params.id){
            maintenance = req;
            console.log(maintenance);
        }; 
    };
    

    if(requested === false){
        ReqMaintenances();
        maintenanceReq(true);
    };


    return (
        <>
            <div className='links'>
                <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link>
                <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
            </div>
            <p>Справочники ТО</p>
            <div className='guides'>
                <GuideTypeOfMaintenance maintenance={maintenance} />
                <GuideOrganization maintenance={maintenance} />
                <GuideServiceCompanyM maintenance={maintenance} />
            </div>
        </> 
    );
}

export default GuidesMaintenances;