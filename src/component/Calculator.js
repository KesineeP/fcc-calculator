import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleSheet.css';
import NumberButtons from './NumberButtons';
import OperatorButtons from './OperatorButtons';
// import Formular from './Formular';
// import Output from './Output';
import { Container } from 'react-bootstrap';

const numberList = [
    ["zero", "0"],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
    ["decimal", "."]
];
const operatorListTop = [["clear", "AC"], ["divide", "/"]];
const operatorListRight = [["multiply", "x"], ["subtract", "-"], ["add", "+"], ["equals", "="]];

const Calculator = () => {
    const [result, setResult] = useState(0)




    return (
        <Container fluid>
            <div style={styles.container}>
                <div id="display" style={styles.display}>
                    <p className="formular">Formular</p>
                    <p className="result">{result}</p>
                </div>
                <div className="button-container">
                    <div className="operatorListTop">
                        {operatorListTop.map((name, index) =>
                            <OperatorButtons
                                name={name[1]}
                                id={name[0]}
                                key={index}
                                areaName={name[0]}
                            />)}
                    </div>
                    <div className="numberBtn">
                        {numberList.map((num, index) =>
                            <NumberButtons
                                id={num[0]}
                                name={num[1]}
                                areaName={num[0]}
                                key={index}
                            />)}
                    </div>
                    <div className="operatorListRight">
                        {operatorListRight.map((name, index) =>
                            <OperatorButtons
                                id={name[0]}
                                name={name[1]}
                                key={index}
                            />)}
                    </div>
                </div>
            </div>
        </Container>
    )
}

const styles = {
    display: {
        backgroundColor: 'lightblue',
        margin: '2px 0',
        borderRadius: '5px',
        width: '200px'
    },
    container: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        marginTop: '10%'
    },
}
export default Calculator;