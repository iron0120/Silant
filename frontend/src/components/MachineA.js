import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "../styles/Machine.css"


function MachineA(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/guides/machines/${props.machine.id}`);
    };

    if(props.role === "Клиент"){
        if(props.firstName === props.machine.client){
            return(
                <>
                    <tr key={props.machine.id} onClick={handleClick}>
                        <td>{props.machine.technic_model}</td>
                        <td>{props.machine.machine_factory_number}</td>
                        <td>{props.machine.engine_model}</td>
                        <td>{props.machine.engine_factory_number}</td>
                        <td>{props.machine.transmission_model}</td>
                        <td>{props.machine.transmission_factory_number}</td>
                        <td>{props.machine.driving_bridge_model}</td>
                        <td>{props.machine.driving_bridge_factory_number}</td>
                        <td>{props.machine.controlled_bridge_model}</td>
                        <td>{props.machine.controlled_bridge_factory_number}</td>
                        <td>{props.machine.delivery_contract}</td>
                        <td>{props.machine.shipment_date}</td>
                        <td>{props.machine.client}</td>
                        <td>{props.machine.consignee}</td>
                        <td>{props.machine.delivery_address}</td>
                        <td>{props.machine.equipment}</td>
                        <td>{props.machine.service_company}</td>
                    </tr>
                </>
            );
        };
    } else if (props.role === 'Сервисная компания'){
        if(props.firstName === props.machine.service_company){
            return(
                <>
                    <tr key={props.machine.id} onClick={handleClick}>
                        <td>{props.machine.technic_model}</td>
                        <td>{props.machine.machine_factory_number}</td>
                        <td>{props.machine.engine_model}</td>
                        <td>{props.machine.engine_factory_number}</td>
                        <td>{props.machine.transmission_model}</td>
                        <td>{props.machine.transmission_factory_number}</td>
                        <td>{props.machine.driving_bridge_model}</td>
                        <td>{props.machine.driving_bridge_factory_number}</td>
                        <td>{props.machine.controlled_bridge_model}</td>
                        <td>{props.machine.controlled_bridge_factory_number}</td>
                        <td>{props.machine.delivery_contract}</td>
                        <td>{props.machine.shipment_date}</td>
                        <td>{props.machine.client}</td>
                        <td>{props.machine.consignee}</td>
                        <td>{props.machine.delivery_address}</td>
                        <td>{props.machine.equipment}</td>
                        <td>{props.machine.service_company}</td>
                    </tr>
                </>
            );
        };
    }else{
        return(
            <>
                <tr key={props.machine.id} onClick={handleClick}>
                    <td>{props.machine.technic_model}</td>
                    <td>{props.machine.machine_factory_number}</td>
                    <td>{props.machine.engine_model}</td>
                    <td>{props.machine.engine_factory_number}</td>
                    <td>{props.machine.transmission_model}</td>
                    <td>{props.machine.transmission_factory_number}</td>
                    <td>{props.machine.driving_bridge_model}</td>
                    <td>{props.machine.driving_bridge_factory_number}</td>
                    <td>{props.machine.controlled_bridge_model}</td>
                    <td>{props.machine.controlled_bridge_factory_number}</td>
                    <td>{props.machine.delivery_contract}</td>
                    <td>{props.machine.shipment_date}</td>
                    <td>{props.machine.client}</td>
                    <td>{props.machine.consignee}</td>
                    <td>{props.machine.delivery_address}</td>
                    <td>{props.machine.equipment}</td>
                    <td>{props.machine.service_company}</td>
                </tr>
            </>
        );
    };
};

export default MachineA;