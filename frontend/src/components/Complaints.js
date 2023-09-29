import * as React from 'react';
import axios from 'axios';

import Complaint from './Complaint';
import Table from 'react-bootstrap/Table';
import { Link, } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Complaints.css"


function Complaints(props) {
    const [response, setResponse] = React.useState([]);
    let [requested, complaintReq] = React.useState(false);
    let[nothing, setNothing] = React.useState(false);
    

    const LINK = `http://127.0.0.1:8000/api/complaints/?failure_node=${props.valueFN}&recovery_method=${props.valueRM}&service_company=${props.valueSC}`;

    var complaints = [];
    

    function ReqComplaints(){
        axios.get(LINK).then(res => {
            setResponse(res.data.results);
            if(res.data.results.length === 0 && requested === true){
                setNothing(true);
            }else{
                setNothing(false);
            };
        });
    };


    for(let i = 0; i < response.length; i+=1) {
        complaints.push(response[i]);
    };
    

    if(requested === false){
        ReqComplaints();
        complaintReq(true);
    };

    if(requested === true){
        console.log(complaints);
    };

    const handleSubmitChange = () =>{
        ReqComplaints();
    };

    return (
        <>
            <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
            <p>Информация о рекламациях</p>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>:
                <Table variant='' striped bordered hover className='complaints'>
                    <thead>
                        <tr>
                            <th>Зав. № машины</th>
                            <th>Дата отказа</th>
                            <th>Наработка, м/час</th>
                            <th>Узел отказа</th>
                            <th>Описание отказа</th>
                            <th>Способ восстановления</th>
                            <th>Используемые запасные части</th>
                            <th>Дата восстановления</th>
                            <th>Время простоя техники</th>
                            <th>Сервисная компания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => <Complaint key={complaint.id} complaint={complaint} />)}
                    </tbody>
                </Table>
            }
        </> 
    );
}

export default Complaints;