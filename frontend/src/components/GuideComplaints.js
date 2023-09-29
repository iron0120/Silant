import * as React from 'react';
import axios from 'axios';
import { useParams, Link,} from 'react-router-dom';


import GuideFailureNode from './GuideFailureNode';
import GuideRecoveryMethod from "./GuideRecoveryMethod";
import GuideServiceCompanyC from './GuideServiceCompanyC';

import "../styles/Guides.css"


function GuideComplaints() {
    const params = useParams();
    const [response, setResponse] = React.useState([]);
    let [requested, complaintReq] = React.useState(false);
  
    const LINK = `http://127.0.0.1:8000/api/complaints/`;

    let complaint = [];
    

    function ReqСomplaints(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            
        });
    };


    for(let i = 0; i < response.length; i+=1) {
        let req = response[i];
        if(String(req.id) === params.id){
            complaint = req;
            console.log(complaint);
        }; 
    };
    

    if(requested === false){
        ReqСomplaints();
        complaintReq(true);
    };


    return (
        <>
            <div className='links'>
                <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link>
                <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
            </div>
            <p>Справочники рекламаций</p>
            <div className='guides'>
                <GuideFailureNode complaint={complaint} />
                <GuideRecoveryMethod complaint={complaint} />
                <GuideServiceCompanyC complaint={complaint} />
            </div>
        </> 
    );
}

export default GuideComplaints;