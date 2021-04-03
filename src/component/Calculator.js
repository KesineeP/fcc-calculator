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
    const [value, setValue] = useState('')
    const [result, setResult] = useState(0)
    const [operation, setOperation] = useState('')
    const [display, setDisplay] = useState(value)
    const [lastButtonPressed, setLastButtonPressed] = useState("number");
    const [formular, setFormular] = useState('')

    const onClickNumber = (num) => {
        if (num === '0' && value === '0') return null;
        if (num === '.' && value[value.length - 1] === '.') return;

        if (num === '.' && value === '') {
            setValue('0'.concat(num));
        } else {
            setValue(value.concat(num));
        }

        setDisplay(value.concat(num));
        setLastButtonPressed('number');

    }
    const calculate = (value) => {
        const numValue = parseFloat(value);
        if (result === 0) {
            setResult(numValue);
            return;
        }
        switch (operation) {
            case "-":
                setResult(result - numValue);
                break;
            case "/":
                setResult(result / numValue);
                break;
            case "+":
                setResult(result + numValue);
                break;
            case "x":
                setResult(result * numValue);
                break;
            case "=":
                break;
            default:
                setResult(numValue);

        }

    };

    const onClickOperation = (button) => {
        if (button === "AC") {
            setOperation("");
            setResult(0);
            setDisplay(0);
        } else {
            if (value !== "") calculate(value);
            if (button === "=") setDisplay(result);
            setOperation(button);
        }
        setValue("");
        setLastButtonPressed(button === "AC" ? "number" : "operator");

    }
    useEffect(() => {
        if (result % 1 === 0) {
            setDisplay(result);
        } else {
            setDisplay(result.toFixed(4));
        }
    }, [result]);



    console.log("value", value);
    console.log("result", result);
    console.log("operation", operation);
    console.log("display", display)
    console.log("------------");

    return (
        <Container fluid>
            <div style={styles.container}>
                <div style={styles.display}>
                    <p className="formular">{formular}</p>
                    <p className="result" id="display">{display || '0'}</p>
                </div>
                <div className="button-container">
                    <div className="operatorListTop">
                        {operatorListTop.map((name, index) =>
                            <OperatorButtons
                                name={name[1]}
                                id={name[0]}
                                key={index}
                                areaName={name[0]}
                                onClickOperation={onClickOperation}
                            />)}
                    </div>
                    <div className="numberBtn">
                        {numberList.map((num, index) =>
                            <NumberButtons
                                id={num[0]}
                                name={num[1]}
                                areaName={num[0]}
                                key={index}
                                onClickNumber={onClickNumber}
                            />)}
                    </div>
                    <div className="operatorListRight">
                        {operatorListRight.map((name, index) =>
                            <OperatorButtons
                                id={name[0]}
                                name={name[1]}
                                key={index}
                                onClickOperation={onClickOperation}
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