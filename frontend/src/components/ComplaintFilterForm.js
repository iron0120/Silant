import React, {useState} from "react";
import axios from "axios";

import Complaints from "./Complaints";
import RecoveryMethod from "./RecoveryMethod";
import FailureNode from "./FailureNode";
import ServiceCompany from "./ServiceCompany";

import { Link, } from "react-router-dom";


function ComplaintFilterForm(props) {
    const [valueFN, setValueFN] = useState('');
    const [valueRM, setValueRM] = useState('');
    const [valueSC, setValueSC] = useState('');


    const handleFailureNodeChange = (valueFN) => {
        setValueFN(valueFN);
    };

    const handleRecoveryMethodChange = (valueRM) => {
        setValueRM(valueRM);
    };

    const handleServiceCompanyChange = (valueSC) => {
        setValueSC(valueSC);
    };


    return(
        <>
            <p>{props.role}: {props.firstName}</p>
            <div className="links">
                <Link className="btn-primary" to="http://localhost:8080/">Общая информация</Link>
                <Link className="btn-primary" to="http://localhost:8080/maintenances">То</Link>
                <Link className="btn-primary" to="http://localhost:8080/complaints">Рекламации</Link>
                <Link className="btn-primary" to="http://localhost:8080/login">Мой профиль</Link> 
            </div>
            <form>
                <p>
                    <label>
                        Узел отказа:
                        <FailureNode onChange={handleFailureNodeChange} />
                    </label>
                </p>
                <p>
                    <label>
                        Способ восстановления: 
                        <RecoveryMethod onChange={handleRecoveryMethodChange} />
                    </label>
                </p>
                <p>
                    <label>
                        Сервисная компания:
                        <ServiceCompany onChange={handleServiceCompanyChange} />
                    </label>
                </p>
            </form>
            <div>
                <Complaints valueFN={valueFN} valueRM={valueRM} valueSC={valueSC}  />
            </div>
        </>
    );
}

export default ComplaintFilterForm;