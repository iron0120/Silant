import * as React from 'react';
import axios from 'axios';

import Machine from './Machine';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Machines.css"


function AuthMachines(props) {
    const [response, setResponse] = React.useState([]);
    let [requested, machineReq] = React.useState(false);
    let[nothing, setNothing] = React.useState(false);
    let [machine_factory_number, setMFN] = React.useState('');
    const[search, setSearch] = React.useState(false);

    const LINK = `http://127.0.0.1:8000/api/machines/?machine_factory_number=${machine_factory_number}`;

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


    const handleSubmitChange = (event) =>{
        setMFN(event.target.value);
    };


    const handleReset = () =>{
        setMFN('');
        setSearch(false);
    };


    const handleSearch = () =>{
        if(machine_factory_number != ''){
            ReqMachines();
            setSearch(true);
        }
    };


    return (
        <>
            <p>Проверьте комплектацию и технические характеристики техники Силант</p>
            <div className="links">
                <Link className="btn-primary" to="http://localhost:8080/login">Авторизоваться</Link>              
            </div>
            <div className="machineForm">
                <input className="inputSearch" type="text" name="machine_factory_number" value={machine_factory_number} onChange={handleSubmitChange} placeholder="Заводской номер машины"/>
                <input className="buttonSearch" type="submit" name="submit" value="Найти"  onClick={handleSearch} />
                <input className="buttonSearch" type="submit" name="submit" value="Сбросить"  onClick={handleReset} />
            </div>
            {nothing ?
                <p className='nothing_found'>По вашему запросу ничего не найдено</p>:
                search?
                <>
                    <p>Информация о комплектации и технических характеристиках Вашей техники</p>
                    <p>Результаты поиска:</p>
                    <Table variant='' striped bordered hover className='machines'>
                        <thead>
                            <tr>
                                <th>Модель техники</th>
                                <th>Зав. № машины</th>
                                <th>Модель двигателя</th>
                                <th>Зав. № двигателя</th>
                                <th>Модель трансмисии (производитель, артикул)</th>
                                <th>Зав. № трансмисии</th>
                                <th>Модель ведущего моста</th>
                                <th>Зав. № ведущего моста</th>
                                <th>Модель управляемого моста</th>
                                <th>Зав. № управляемого моста</th>
                            </tr>
                        </thead>
                        <tbody>
                            {machines.map((machine) => <Machine key={machine.id} machine={machine}/>)}
                        </tbody>
                    </Table>
                </>: null
                
            }
        </> 
    );
}

export default AuthMachines;