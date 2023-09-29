import React from "react";
import textLogo from "../images/textLogo.svg";
import logo from "../images/logo.svg";
import '../styles/Footer.css'


function Footer() {

    return (
        <>
            <footer className="foot"> 
                <div className="last_line">
                    <div className="Logo">
                        <img alt="Silant logo" src={ logo } className="logo"/>
                        <img alt="Silant textLogo" src={ textLogo } className="textLogo"/>
                    </div>
                    <p>
                        +7-8352-20-12-09, telegram
                    </p>
                    <p className="Silant">Мой Силант 2023</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;