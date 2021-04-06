import React from 'react';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';


const NumberButtons = ({ name, areaName, onClickNumber, id }) => {
    const style = {
        default: {
            gridArea: areaName
        }
    }
    return (
        <Button
            type="button"
            variant="outline-secondary"
            id={id}
            style={style.default}
            onClick={() => onClickNumber(name)}
        >
            {name}
        </Button >
    )
}

export default NumberButtons;