import React from 'react';
import Button from 'react-bootstrap/Button';

const OperatorButtons = ({ name, id, areaName }) => {
    const style = {
        default: {
            gridArea: areaName
        }
    }
    return (
        <Button variant="outline-info" id={id} style={style.default}>
            {name}
        </Button>
    )
}
export default OperatorButtons;