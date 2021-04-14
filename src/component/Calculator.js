import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StyleSheet.css';
import NumberButtons from './NumberButtons';
import OperatorButtons from './OperatorButtons';
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
    const [currentValue, setCurrentValue] = useState('')
    const [operation, setOperation] = useState('')
    const [lastButtonPressed, setLastButtonPressed] = useState("");
    const [data, setData] = useState({ result: 0, display: currentValue })


    const getDisplayNumber = (num) => {
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits.length > 4 ? parseFloat(decimalDigits).toFixed(4) : decimalDigits}`
        } else {
            return integerDisplay
        }

    }
    const onClickNumber = (num) => {

        if (num === '0' && currentValue === '0') return null;
        if (num === '.' && currentValue.includes('.')) return;

        if (num === '.' && currentValue === '') {
            console.log('click decimal')
            setCurrentValue('0'.concat(num));
        } else {
            setCurrentValue(currentValue.concat(num));
        }

        setData({ ...data, display: currentValue.concat(num) })
        setLastButtonPressed('number');
    }

    const onClickOperation = (button) => {

        if (button === "AC") {
            setCurrentValue('')
            setData({ result: 0, display: 0 })
            setOperation('');

        } else if (button === '-' && currentValue === '') {
            console.log('substraction click')
        } else {
            if (currentValue !== '') calculate(currentValue)
            setOperation(button)
            if (button === '=') {
                setData((prev) => {
                    return { ...prev, display: prev.result }
                })
            }
        }

        setCurrentValue('')
        setOperation(button);
        setLastButtonPressed(button === "AC" ? "number" : "operator");

    }

    const calculate = (currentValue) => {
        const numValue = parseFloat(currentValue);
        if (data.result === 0) {
            setData({ result: numValue, display: numValue })
            return;
        }
        let calcNum;
        switch (operation) {
            case "-":
                calcNum = data.result - numValue;
                setData({ result: calcNum, display: calcNum })
                break;
            case "/":
                calcNum = data.result / numValue;
                setData({ result: calcNum, display: calcNum })
                break;
            case "+":
                calcNum = data.result + numValue;
                setData({ result: calcNum, display: calcNum })
                break;
            case "x":
                calcNum = data.result * numValue;
                setData({ result: calcNum, display: calcNum })
                break;
            case "=":
                break;
            default:
                setData({ result: numValue, display: numValue })

        }

    };


    console.log("currentValue", currentValue);
    console.log("operation", operation);
    console.log("lastbutton", lastButtonPressed)
    console.log("data", data)
    console.log("------------");

    return (
        <Container fluid>
            <div style={styles.container}>
                <div style={styles.display}>
                    <p className="result" id="display">{getDisplayNumber(data.display) || '0'}</p>
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
        minHeight: '80px',
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