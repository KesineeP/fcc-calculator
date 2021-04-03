import React from 'react';
import Button from 'react-bootstrap/Button';

const OperatorButtons = ({ name, id, areaName, onClickOperation }) => {
    const style = {
        default: {
            gridArea: areaName
        }
    }
    return (
        <Button
            variant="outline-info"
            id={id}
            style={style.default}
            onClick={() => onClickOperation(name)}>
            {name}
        </Button >
    )
}
export default OperatorButtons;