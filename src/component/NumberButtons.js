import React, { useState, useEffect } from 'react'
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
            variant="outline-secondary"
            id={id}
            style={style.default}
        >
            {name}
        </Button>
    )
}
// const Buttons = () => {
//     return (
//         <div>
//             <div style={styles.buttons}>
//                 <ButtonGroup arial-label="Basic example">
//                     <Button lg={4} variant="light" id="clear" value="clear" size="lg">AC</Button>
//                     <Button lg={2} variant="light" id="divide" value="/" size="lg">/</Button>
//                     <Button lg={2} variant="light" id="multiply" value="*" size="lg">x</Button>
//                 </ButtonGroup>
//                 <ButtonGroup arial-label="Basic example">
//                     <Button variant="light" id="seven" value="7" size="lg">7</Button>
//                     <Button variant="light" id="eight" value="8" size="lg">8</Button>
//                     <Button variant="light" id="nine" value="9" size="lg">9</Button>
//                     <Button variant="light" id="substract" value="-" size="lg">-</Button>
//                 </ButtonGroup>
//                 <ButtonGroup arial-label="Basic example">
//                     <Button variant="light" id="four" value="4" size="lg">4</Button>
//                     <Button variant="light" id="five" value="5" size="lg">5</Button>
//                     <Button variant="light" id="six" value="6" size="lg">6</Button>
//                     <Button variant="light" id="add" value="+" size="lg">+</Button>
//                 </ButtonGroup>
//                 <ButtonGroup arial-label="Basic example">
//                     <Button variant="light" id="one" value="1" size="lg">1</Button>
//                     <Button variant="light" id="two" value="2" size="lg">2</Button>
//                     <Button variant="light" id="three" value="3" size="lg">3</Button>
//                     <Button variant="light" id="decimal" value="." size="lg">.</Button>

//                 </ButtonGroup>
//                 <ButtonGroup arial-label="Basic example">
//                     <Button variant="light" id="zero" value="0" size="lg">0</Button>

//                     <Button variant="light" id="equals" value="=" size="lg">=</Button>
//                 </ButtonGroup>
//             </div>
//         </div>
//     )
// }
// const styles = {
//     buttons: {
//         display: 'flex',
//         flexDirection: 'column'
//     }
// }
export default NumberButtons;