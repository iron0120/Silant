import React, {useState, useEffect} from "react";
import { Routes, Route } from 'react-router-dom'; 
import axios from 'axios';

import Group from "./Group";
import MachineFilterForm from "./MachineFilterForm";
import ComplaintFilterForm from "./ComplaintFilterForm";
import MaintenanceFilterForm from "./MaintenanceFilterForm";
import GuidesMachine from "./GuidesMachine";
import GuidesMaintenances from "./GuideMaintenances";
import GuideComplaints from "./GuideComplaints";
import Login from "./Login";
import AddMaintenanceForm from "./AddMaintenanceForm/AddMaintenanceForm";
import Clients from "./Clients";
import Machines from "./Machines";


const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});
  

function App () {
    const [token, setToken] = useState()
    const [loading, setLoading] = useState();
    const [formUsername, setFormUsername] = useState();
    const [formPassword, setFormPassword] = useState();
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dateJoined, setDateJoined] = useState('');
    const [groups, setGroups] = useState('');
    const [error, setError] = useState();
    const [logined, setLogined] = useState(false);
    const [userData, setuserData] = useState([]);
    const [role, setRole] = useState(''); 
    const [response1, setResponse] = React.useState([]);
    let [requested, clientReq] = React.useState(false);
    const [response2, setResponse2] = React.useState([]);
    let [requested2, serviceCompanyReq] = React.useState(false);
    
    const LINK1 = 'http://127.0.0.1:8000/api/clients/';
    const LINK2 = 'http://127.0.0.1:8000/api/service_companies/';

    var user = [];
    var servc = [];
    
    async function ReqClient(){
        let response = await axios.get(LINK1);
        return response.data.results;
    };
     
    if(requested === true){
        for(let i=0; i < response1.length; i+=1){
            let model = response1[i];
            if(firstName === model.name){
                user = model.id;
                console.log(user);
            };
        };
    }

    async function ReqServCompany(){
        let response = await axios.get(LINK2);
        return response.data.results;
    };
     
    if(requested2 === true){
        for(let i=0; i < response2.length; i+=1){
            let model = response2[i];
            if(firstName === model.name){
                servc = model.id;
                console.log(servc);
            };
        };
    }


    useEffect(() => {
        if (token) {
            fetch(
                'http://127.0.0.1:8000/api/user',
                {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Token ${token}`,
                },
                }
            )
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                    if (response.status === 401) {
                        throw Error('refresh');
                    };
                    throw Error(`Something went wrong: code ${response.status}`);
                };
            })
            .then(({data}) => {
                setFirstName(data.first_name);
                setUsername(data.username);
                setEmail(data.email);
                setDateJoined(data.date_joined);
                setGroups(data.groups);
                setError(null);
                console.log(data);
                setuserData(data);
                if(data.groups[0] === 1){
                    setRole('Клиент');
                }else if(data.groups[0] === 2){
                    setRole('Сервисная компания');
                }else{
                    setRole('Менеджер');
                };
            })
            .catch(error => {
                console.log(error)
                setError('Ошибка с подкдючением данных о пользователе')
            })
        }
    }, [token])

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        ReqClient().then(data => {setResponse(data)});
        clientReq(true);
        ReqServCompany().then(data => {setResponse2(data)});
        serviceCompanyReq(true);
        fetch(
            'http://127.0.0.1:8000/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: formUsername,
                    password: formPassword,
                })
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(`Something went wrong: code ${response.status}`)
            }
        })
        .then(({key}) => {
            setToken(key);
            setError(null);
        })
        .catch(error => {
            console.log(error)
            setError('Ошибка с входом в аккаунт')
        })
        .finally(setLoading(false))
    };


    function submitLogout(e) {
        client.post(
            "/api/logout",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    
                })
            }
          ).then(function(res) {
            setLogined(false);
            setToken();
          });
    };


    const handleformUsername = (usernameF) => {
        setFormUsername(usernameF);
    };


    const handleFormPassword = (passwordF) => {
        setFormPassword(passwordF);
    };


    const handleLogin = (logined) => {
        setLogined(logined);
        console.log(logined);
    };


    return (
        <>
            <Routes>
                <Route path="/" element={<Group /> }>
                    <Route index path="/" element={<MachineFilterForm
                        role={role}
                        logined={logined} 
                        firstName={firstName} 
                        groups={groups}
                        user={user}
                        servc={servc}
                    />}></Route>
                    <Route path="/maintenances" element={<MaintenanceFilterForm 
                        firstName={firstName}
                        user={user}
                        role={role}
                        servc={servc}
                    />}/>
                    <Route path="/complaints" element={<ComplaintFilterForm 
                        firstName={firstName}
                        user={user}
                        role={role}
                        servc={servc}
                    />}/>
                    <Route path="/guides/machines/:id" element={<GuidesMachine /> } />
                    <Route path="/guides/maintenances/:id" element={<GuidesMaintenances /> } />
                    <Route path="/guides/complaints/:id" element={<GuideComplaints /> } />
                    <Route path="/login" element={<Login
                        logined={logined}
                        submitHandler={submitHandler}
                        loading={loading}
                        error={error} 
                        formUsername={formUsername}
                        formPassword={formPassword}
                        onChangehandleformUsername={handleformUsername}
                        onChangehandleFormPassword={handleFormPassword}
                        username={username}
                        firstName={firstName}
                        dateJoined={dateJoined}
                        groups={groups}
                        email={email}
                        onChangehandleLogin={handleLogin}
                        token={token}
                        submitLogout={submitLogout}
                        role={role}
                    />}/>
                    <Route path="/maintenances/add" element={<AddMaintenanceForm 
                        firstName={firstName}
                        user={user}
                        role={role}
                        servc={servc}
                    />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;