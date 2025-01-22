const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';


function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    return (num1 / num2);
}

function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case ADD:
            result = add(num1, num2);
            break;
        case SUBTRACT:
            result = subtract(num1, num2);
            break;
        case MULTIPLY:
            result = multiply(num1, num2);
            break;
        case DIVIDE:
            result = divide(num1, num2);
            break;
    }
  return result;
}