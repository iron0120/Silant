import React from "react";

import Table from 'react-bootstrap/Table'


function GuideFactoryNumber(props) {

    return(
        <>
            <Table>
            <thead>
                        <tr>
                            <th>Серийный номер машины</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Номер: {props.machine.machine_factory_number}</td></tr>
                    </tbody>
            </Table>
        </>
    );
}

export default GuideFactoryNumber;