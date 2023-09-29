import React, {useState, useEffect } from "react";
import axios from "axios";
import MachineFilterForm from "./MachineFilterForm";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Login.css"


function Login(props) { 
    const navigate = useNavigate();

    
    const handleRedirect = () => {
        props.onChangehandleLogin(true);
    };

    const handleLogout = () => {
        props.submitLogout();
        navigate(`/`);
    };

    const handleformUsername = (e) => {
        props.onChangehandleformUsername(e.target.value);
    };


    const handleFormPassword = (e) => {
        props.onChangehandleFormPassword(e.target.value);
    };


    return(
        <>
            {props.error? <p>{props.error}</p> : null}
            {!props.token?
                props.loading? "Загрузка..." :
                    <form className="loginForm" onSubmit={props.submitHandler}>
                        <input className="inputSearch" type="text" name="username" value={props.formUsername} onChange={handleformUsername} placeholder="Username"/>
                        <input className="inputSearch" type="password" name="password" value={props.formPassword} onChange={handleFormPassword} placeholder="Password"/>
                        <input className="buttonEnter" type="submit" name="submit" value="Войти"  onClick={handleRedirect} />
                    </form>
            :
            !props.error?
                <>
                    <p>{props.role}: {props.firstName}</p>
                    <div className="buttonLogout"><input className="Logout" type="submit" name="submit" value="Выйти"  onClick={handleLogout} /></div>
                    <div className="links">
                        <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                        <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                        <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link> 
                    </div>
                </>
            :
                null
            }
        </>
    );
}

export default Login;