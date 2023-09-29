import React from "react";
import '../styles/Header.css'
import { Link, Outlet } from "react-router-dom";
import textLogo from "../images/textLogo.svg";
import logo from "../images/logo.svg";
import { useEffect } from "react";
import axios from "axios";


function Header(props) {

    return (
        <>
            <header className="head"> 
                <div className="first_line">
                    <div className="Logo">
                        <img alt="Silant logo" src={ logo } className="logo"/>
                        {/* <Link to="http://127.0.0.1:8080/" ><img alt="Silant textLogo" src={ textLogo } className="textLogo"/></Link> */}
                        <img alt="Silant textLogo" src={ textLogo } className="textLogo"/> 
                    </div>
                    <p>
                        +7-8352-20-12-09, telegram
                    </p>
                </div>
                <div>
                    <p className="header_text">
                        Электронная сервисная книжка "Мой Силант"
                    </p>
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default Header;