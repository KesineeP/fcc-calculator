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
const operatorListTop = [["clear", "AC"], ["divide", "÷"]];
const operatorListRight = [["multiply", "x"], ["subtract", "-"], ["add", "+"], ["equals", "="]];

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState('');
    const [prevOperand, setPrevOperand] = useState('');
    const [prevValue, setPrevValue] = useState('');
    const [operation, setOperation] = useState('');
    const [lastButtonPressed, setLastButtonPressed] = useState("");
    const [data, setData] = useState({ result: 0, display: currentValue });


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
        if (num === '0' && prevOperand === '') return null;
        if (num === '.' && currentValue.includes('.')) return;

        if (num === '.' && currentValue === '') {
            setCurrentValue('0'.concat(num));
        } else {
            setCurrentValue(currentValue.concat(num));
        }

        setData({ ...data, display: currentValue.concat(num) })
        setPrevOperand(`${prevOperand}${num}`)
        setLastButtonPressed('number');

    }

    const onClickOperation = (button) => {

        let newInput = undefined;
        if (button === "AC") {
            setCurrentValue('')
            setData({ result: 0, display: 0 })
            setOperation('');
            setPrevOperand('')
        } else if (lastButtonPressed !== 'number') {
            if (button === '-') {
                setCurrentValue('-');
                setPrevOperand(`${prevOperand}-`)

            } else if (button !== '-') {
                newInput = prevOperand.endsWith("-")
                    ? prevOperand.substring(0, prevOperand.length - 4)
                    : prevOperand.substring(0, prevOperand.length - 3);
                setPrevOperand(`${newInput} ${button} `);

            }
        } else {
            if (currentValue !== '') calculate(currentValue)
            setOperation(button)
            setPrevOperand(`${prevOperand} ${button} `)
            if (prevOperand.endsWith('-')) {
                newInput = prevOperand.substring(0, prevOperand.length - 4);
                setPrevOperand(newInput)

            }
            if (button === '=') {
                setData((prev) => {
                    return { ...prev, display: prev.result }
                })
                setPrevOperand(`${prevOperand} `)
                setCurrentValue(safeEval(newInput))
            }

        }
        setCurrentValue('');
        setOperation(button);
        setLastButtonPressed(button === "AC" ? "number" : "operator");

    }

    const safeEval = (newInput) => {
        if (!prevOperand) {
            return currentValue;
        }
        const inputArray = newInput ? newInput.split(" ") : prevOperand.split(" ");
        const numbers = [];
        const operators = [];

        for (let i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                numbers.push(parseFloat(inputArray[i]));
            } else if (inputArray[i].match(/^(\+|-|x|÷)$/)) {
                operators.push(inputArray[i]);
            }
        }
        const reducer = (result, numValue, index) => {
            let calcNum;
            switch (operators[index - 1]) {
                case "-":
                    calcNum = result - numValue;
                    setData({ result: calcNum, display: calcNum })
                    break;
                case "÷":
                    calcNum = result / numValue;
                    setData({ result: calcNum, display: calcNum })
                    break;
                case "+":
                    calcNum = result + numValue;
                    setData({ result: calcNum, display: calcNum })
                    break;
                case "x":
                    calcNum = result * numValue;
                    setData({ result: calcNum, display: calcNum })
                    break;
                case "=":
                    break;
                default:
                    return;
            }
        };

        return numbers.reduce(reducer);
    };


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
            case "÷":
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
                return;
        }

    };

    console.log("prevOperand", prevOperand);
    console.log("prevValue", prevValue);
    console.log("currentValue", currentValue);
    console.log("operation", operation);
    console.log("lastbutton", lastButtonPressed)
    console.log("data", data)
    console.log("------------");

    return (
        <Container fluid>
            <div style={styles.container}>
                <h1>Calculator</h1>
                <div style={styles.display}>
                    <span className="formula">{prevOperand}</span>
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
            <p>Coded by Kesinee</p>
        </Container>
    )
}

const styles = {
    display: {
        minHeight: '40px',
        padding: '10px 0',
        backgroundColor: 'lightblue',
        margin: '5px 0',
        borderRadius: '5px',
        width: '230px',
        boxShadow: '1px 1px 3px grey',
    },
    container: {
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '10%',
        border: '1px solid darkgrey',
        borderRadius: '10px',
        boxShadow: '2px 2px 5px grey',
        padding: '9px',
        backgroundColor: '#effcf7'
    },
}
export default Calculator;