import * as React from 'react';
import axios from 'axios';

import Maintenance from './Maintenance';

import { Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Maintenances.css"


function Maintenances(props) {
    const [response, setResponse] = React.useState([]);
    let [requested, maintenanceReq] = React.useState(false);
    let[nothing, setNothing] = React.useState(false);
    const[click, setClick] = React.useState(false);
    const navigate = useNavigate();


    const LINK = `http://127.0.0.1:8000/api/maintenances/?type_of_maintenance=${props.valueToM}&machine=${props.valueM}&service_company=${props.valueSC}`;

    const LINK2 = `http://127.0.0.1:8000/api/maintenances/?machine=${props.machine_url}`;

    var maintenances = [];
    

    function ReqMaintenances(){
        if(props.touch === false){
            axios.get(LINK).then(res => {
                setResponse(res.data.results);
                if(res.data.results.length === 0 && requested === true){
                    setNothing(true);
                }else{
                    setNothing(false);
                };
            });
        }else{
            axios.get(LINK2).then(res => {
                setResponse(res.data.results);
                if(res.data.results.length === 0 && requested === true){
                    setNothing(true);
                }else{
                    setNothing(false);
                };
            });
        }
        
    };


    for(let i = 0; i < response.length; i+=1) {
        maintenances.push(response[i]);
    };
    

    if(requested === false){
        ReqMaintenances();
        maintenanceReq(true);
    };


    if(requested === true){
        console.log(maintenances);
    };


    const handleSubmitChange = () =>{
        props.setTouch(false);
        setClick(true);
        ReqMaintenances();
    };


    if(props.touch === true ){
        ReqMaintenances();
        props.setTouch(false);
    }


    const handleAdd = () => {
        navigate(`/maintenances/add`);
    };


    if(props.role === 'Менеджер'){
        return (
            <>
                <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
                {/* <div className='button'><button onClick={handleAdd}>Добавить ТО</button></div> */}
                {click? 
                    nothing?
                        <p className='nothing_found'>По вашему запросу ничего не найдено</p>
                    :
                        <>
                            <p>Информация о проведеных ТО Вашей техники</p>
                            <Table variant='' striped bordered hover className='maintenances'>
                                <thead>
                                    <tr>
                                        <th>Зав. № машины</th>
                                        <th>Вид ТО</th>
                                        <th>Дата проведения ТО</th>
                                        <th>Наработка, м/час</th>
                                        <th>№ заказ-наряда</th>
                                        <th>Дата заказ-наряда</th>
                                        <th>Организация, проводившая ТО</th>
                                        <th>Сервисная компания</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.map((maintenance) => <Maintenance key={maintenance.id} maintenance={maintenance}  />)}
                                </tbody>
                            </Table>
                        </>
                :
                    null
                }
            </> 
        );
    };


    if((props.valueToM ==='') && (props.valueM==='') && (props.valueSC==='')){
        return(
            <>
                <p className='nothing_found'>Выберите машину</p>
            </>
        );
    }else if((props.valueM==='')){
        return(
            <>
                <p className='nothing_found'>Выберите машину</p>
            </>
        );
    }else{
        return (
            <>
                <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
                {/* <div className='button'><button onClick={handleAdd}>Добавить ТО</button></div> */}
                {click? 
                    nothing?
                        <p className='nothing_found'>По вашему запросу ничего не найдено</p>
                    :
                        <>
                            <p>Информация о проведеных ТО Вашей техники</p>
                            <Table variant='' striped bordered hover className='maintenances'>
                                <thead>
                                    <tr>
                                        <th>Зав. № машины</th>
                                        <th>Вид ТО</th>
                                        <th>Дата проведения ТО</th>
                                        <th>Наработка, м/час</th>
                                        <th>№ заказ-наряда</th>
                                        <th>Дата заказ-наряда</th>
                                        <th>Организация, проводившая ТО</th>
                                        <th>Сервисная компания</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenances.map((maintenance) => <Maintenance key={maintenance.id} maintenance={maintenance}  />)}
                                </tbody>
                            </Table>
                        </>
                :
                    null
                }
            </> 
        );
    };
}

export default Maintenances;