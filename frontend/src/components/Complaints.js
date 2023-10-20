import * as React from 'react';
import axios from 'axios';

import Complaint from './Complaint';
import Table from 'react-bootstrap/Table';


import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Complaints.css"


function Complaints(props) {
    const [response, setResponse] = React.useState([]);
    let [requested, complaintReq] = React.useState(false);
    let[nothing, setNothing] = React.useState(false);
    const [sortColumn, setSortColumn] = React.useState(null);
    const [sortDirection, setSortDirection] = React.useState('asc');
    

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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedReclamations = complaints && complaints.length ? complaints.sort((a, b) => {
        if (sortColumn === 'date_of_failure') {
            return sortDirection === 'asc' ? a.date_of_failure.localeCompare(b.date_of_failure) : b.date_of_failure.localeCompare(a.date_of_failure);
        } else if (sortColumn === 'operating_time') {
            return sortDirection === 'asc' ? a.operating_time - b.operating_time : b.operating_time - a.operating_time;
        } else if (sortColumn === 'failure_node') {
            return sortDirection === 'asc' ? a.failure_node.localeCompare(b.failure_node) : b.failure_node.localeCompare(a.failure_node);
        } else if (sortColumn === 'description_of_failure') {
            return sortDirection === 'asc' ? a.description_of_failure.localeCompare(b.description_of_failure) : b.description_of_failure.localeCompare(a.description_of_failure);
        } else if (sortColumn === 'recovery_method') {
            return sortDirection === 'asc' ? a.recovery_method.localeCompare(b.recovery_method) : b.recovery_method.localeCompare(a.recovery_method);
        } else if (sortColumn === 'spare_parts_used') {
            return sortDirection === 'asc' ? a.spare_parts_used.localeCompare(b.spare_parts_used) : b.spare_parts_used.localeCompare(a.spare_parts_used);
        } else if (sortColumn === 'date_of_recovery') {
            return sortDirection === 'asc' ? a.date_of_recovery.localeCompare(b.date_of_recovery) : b.date_of_recovery.localeCompare(a.date_of_recovery);
        } else if (sortColumn === 'technic_downtime') {
            return sortDirection === 'asc' ? a.technic_downtime - b.technic_downtime : b.technic_downtime - a.technic_downtime;
        } else if (sortColumn === 'machine') {
            return sortDirection === 'asc' ? a.machine.localeCompare(b.machine) : b.machine.localeCompare(a.machine);
        } else if (sortColumn === 'service_company') {
            return sortDirection === 'asc' ? a.service_company.localeCompare(b.service_company) : b.service_company.localeCompare(a.service_company);
        }

        return 0;
    }) : [];

    return (
        <>
            <div className='button'><button onClick={handleSubmitChange}>Найти</button></div>
            <p>Информация о рекламациях</p>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>:
                <Table variant='' striped bordered hover className='complaints'>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('machine')}>
                                    Зав. № машины
                                    {sortColumn === 'machine' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('date_of_failure')}>
                                    Дата отказа
                                    {sortColumn === 'date_of_failure' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('operating_time')}>
                                    Наработка, м/час
                                    {sortColumn === 'operating_time' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('failure_node')}>
                                    Узел отказа
                                    {sortColumn === 'failure_node' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('description_of_failure')}>
                                    Описание отказа
                                    {sortColumn === 'description_of_failure' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('recovery_method')}>
                                    Способ восстановления
                                    {sortColumn === 'recovery_method' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('spare_parts_used')}>
                                Запасные части
                                {sortColumn === 'spare_parts_used' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('date_of_recovery')}>
                                Дата восстановления
                                {sortColumn === 'date_of_recovery' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('technic_downtime')}>
                                Время простоя техники
                                {sortColumn === 'technic_downtime' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => handleSort('service_company')}>
                                    Сервисная компания
                                    {sortColumn === 'service_company' && (sortDirection === 'asc' ? ' ▲' : ' ▼')}
                            </th>
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