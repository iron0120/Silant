import * as React from 'react';
import axios from 'axios';

import MachineA from './MachineA';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/AuthMachines.css";


function AuthMachines(props) {
    const [response, setResponse] = React.useState([]);
    let [requested, machineReq] = React.useState(false);
    let[nothing, setNothing] = React.useState(false);

    const [sortColumn, setSortColumn] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');

    const LINK = `http://127.0.0.1:8000/api/machines/?machine_factory_number=&technic_model=${props.valueTM}&engine_model=${props.valueEM}&transmission_model=${props.valueTrM}&driving_bridge_model=${props.valueDBM}&controlled_bridge_model=${props.valueCBM}&client=${props.user}&service_company=${props.servc}`;

    var machines = [];


    function ReqMachines(){
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
        machines.push(response[i]);
    };


    if(requested === false){
        ReqMachines();
        machineReq(true);
    };


    if(requested === true){
        console.log(machines);
    };


    const handleSubmitChange = () =>{
        ReqMachines();
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedMachines = machines && machines.length ? machines.sort((a, b) => {
        if (sortColumn === 'machine_factory_number') {
            return sortDirection === 'asc' ? a.machine_factory_number.localeCompare(b.machine_factory_number) : b.machine_factory_number.localeCompare(a.machine_factory_number);
        } else if (sortColumn === 'technic_model') {
            return sortDirection === 'asc' ? a.technic_model.localeCompare(b.technic_model) : b.technic_model.localeCompare(a.technic_model);
        } else if (sortColumn === 'engine_model') {
            return sortDirection === 'asc' ? a.engine_model.localeCompare(b.engine_model) : b.engine_model.localeCompare(a.engine_model);
        } else if (sortColumn === 'engine_factory_number') {
            return sortDirection === 'asc' ? a.engine_factory_number.localeCompare(b.engine_factory_number) : b.engine_factory_number.localeCompare(a.engine_factory_number);
        } else if (sortColumn === 'transmission_model') {
            return sortDirection === 'asc' ? a.transmission_model.localeCompare(b.transmission_model) : b.transmission_model.localeCompare(a.transmission_model);
        } else if (sortColumn === 'transmission_factory_number') {
            return sortDirection === 'asc' ? a.transmission_factory_number.localeCompare(b.transmission_factory_number) : b.transmission_factory_number.localeCompare(a.transmission_factory_number);
        } else if (sortColumn === 'driving_bridge_model') {
            return sortDirection === 'asc' ? a.driving_bridge_model.localeCompare(b.driving_bridge_model) : b.driving_bridge_model.localeCompare(a.driving_bridge_model);
        } else if (sortColumn === 'driving_bridge_factory_number') {
            return sortDirection === 'asc' ? a.driving_bridge_factory_number.localeCompare(b.driving_bridge_factory_number) : b.driving_bridge_factory_number.localeCompare(a.driving_bridge_factory_number);
        } else if (sortColumn === 'controlled_bridge_model') {
            return sortDirection === 'asc' ? a.controlled_bridge_model.localeCompare(b.controlled_bridge_model) : b.controlled_bridge_model.localeCompare(a.controlled_bridge_model);
        } else if (sortColumn === 'controlled_bridge_factory_number') {
            return sortDirection === 'asc' ? a.controlled_bridge_factory_number.localeCompare(b.controlled_bridge_factory_number) : b.controlled_bridge_factory_number.localeCompare(a.controlled_bridge_factory_number);
        } else if (sortColumn === 'delivery_contract') {
            return sortDirection === 'asc' ? a.delivery_contract.localeCompare(b.delivery_contract) : b.delivery_contract.localeCompare(a.delivery_contract);
        } else if (sortColumn === 'shipment_date') {
            return sortDirection === 'asc' ? a.shipment_date.localeCompare(b.shipment_date) : b.shipment_date.localeCompare(a.shipment_date);
        } else if (sortColumn === 'consignee') {
            return sortDirection === 'asc' ? a.consignee.localeCompare(b.consignee) : b.consignee.localeCompare(a.consignee);
        } else if (sortColumn === 'delivery_address') {
            return sortDirection === 'asc' ? a.delivery_address.localeCompare(b.delivery_address) : b.delivery_address.localeCompare(a.delivery_address);
        } else if (sortColumn === 'equipment') {
            return sortDirection === 'asc' ? a.equipment.localeCompare(b.equipment) : b.equipment.localeCompare(a.equipment);
        } else if (sortColumn === 'client') {
            return sortDirection === 'asc' ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client);
        } else if (sortColumn === 'service_company') {
            return sortDirection === 'asc' ? a.service_company.localeCompare(b.service_company) : b.service_company.localeCompare(a.service_company);
        };

        return 0;
    }) : [];


    return (
        <>
            <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
            <p>Информация о комплектации и технических характеристиках Вашей техники</p>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>
            :
                <Table variant='' striped bordered hover className='machines'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('technic_model')}>
                                    Модель техники
                                    {sortColumn === 'technic_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('machine_factory_number')}>
                                    Зав. № машины
                                    {sortColumn === 'machine_factory_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('engine_model')}>
                                    Модель двигателя
                                    {sortColumn === 'engine_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('engine_factory_number')}>
                                    Зав. № двигателя
                                    {sortColumn === 'engine_factory_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('transmission_model')}>
                                    Модель трансмиссии
                                    {sortColumn === 'transmission_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('transmission_factory_number')}>
                                    Зав. № трансмиссии
                                    {sortColumn === 'transmission_factory_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('driving_bridge_model')}>
                                    Модель ведущего моста
                                    {sortColumn === 'driving_bridge_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('driving_bridge_factory_number')}>
                                    Зав. № ведущего моста
                                    {sortColumn === 'driving_bridge_factory_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('controlled_bridge_model')}>
                                    Модель управляемого моста
                                    {sortColumn === 'controlled_bridge_model' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('controlled_bridge_factory_number')}>
                                    Зав. № управляемого моста
                                    {sortColumn === 'controlled_bridge_factory_number' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('delivery_contract')}>
                                    Договор поставки №, дата
                                    {sortColumn === 'delivery_contract' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('shipment_date')}>
                                    Дата отгрузки с завода
                                    {sortColumn === 'shipment_date' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('client')}>
                                    Клиент
                                    {sortColumn === 'client' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('consignee')}>
                                    Грузополучатель
                                    {sortColumn === 'consignee' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('delivery_address')}>
                                    Адрес поставки
                                    {sortColumn === 'delivery_address' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('equipment')}>
                                    Комплектация
                                    {sortColumn === 'equipment' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('service_company')}>
                                    Сервисная компания
                                    {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {machines.map((machine) => <MachineA key={machine.id} machine={machine} firstName={props.firstName} role={props.role} />)}
                    </tbody>
                </Table>
            }
            
        </>
    );
}

export default AuthMachines;