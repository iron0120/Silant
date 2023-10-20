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
    const [sortColumn, setSortColumn] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');


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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMaintenances = maintenances && maintenances.length ? maintenances.sort((a, b) => {
        if (sortColumn === 'type_of_maintenance') {
            return sortDirection === 'asc' ? a.type_of_maintenance.localeCompare(b.type_of_maintenance) : b.type_of_maintenance.localeCompare(a.type_of_maintenance);
        }
        else if (sortColumn === 'date_of_maintenance') {
            return sortDirection === 'asc' ? a.date_of_maintenance.localeCompare(b.date_of_maintenance) : b.date_of_maintenance.localeCompare(a.date_of_maintenance);
        } else if (sortColumn === 'operating_time') {
            return sortDirection === 'asc' ? a.operating_time - b.operating_time : b.operating_time - a.operating_time;
        } else if (sortColumn === 'order_number') {
            return sortDirection === 'asc' ? a.order_number.localeCompare(b.order_number) : b.order_number.localeCompare(a.order_number);
        } else if (sortColumn === 'data_of_order') {
            return sortDirection === 'asc' ? a.data_of_order.localeCompare(b.data_of_order) : b.data_of_order.localeCompare(a.data_of_order);
        } else if (sortColumn === 'organization') {
            return sortDirection === 'asc' ? a.organization.localeCompare(b.organization) : b.organization.localeCompare(a.organization);
        } else if (sortColumn === 'machine') {
            return sortDirection === 'asc' ? a.machine.localeCompare(b.machine) : b.machine.localeCompare(a.machine);
        } else if (sortColumn === 'service_company') {
            return sortDirection === 'asc' ? a.service_company.localeCompare(b.service_company) : b.service_company.localeCompare(a.service_company);
        }
        return 0;
    }) : [];


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
                                        <th onClick={() => handleSort('machine')}>
                                            Зав. № машины
                                            {sortColumn === 'machine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th onClick={() => handleSort('type_of_maintenance')}>
                                            Вид ТО
                                            {sortColumn === 'type_of_maintenance' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th onClick={() => handleSort('date_of_maintenance')}>
                                            Дата проведения ТО
                                            {sortColumn === 'date_of_maintenance' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th onClick={() => handleSort('operating_time')}>
                                            Наработка, м/час
                                            {sortColumn === 'operating_time' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                         </th>
                                        <th onClick={() => handleSort('order_number')}>
                                            № заказ-наряда
                                            {sortColumn === 'order_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th onClick={() => handleSort('data_of_order')}>
                                            Дата заказ-наряда
                                            {sortColumn === 'data_of_order' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                         </th>
                                        <th onClick={() => handleSort('organization')}>
                                            Организация, проводившая ТО
                                            {sortColumn === 'organization' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                        <th onClick={() => handleSort('service_company')}>
                                            Сервисная компания
                                            {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
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