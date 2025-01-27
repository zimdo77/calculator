const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "×";
const DIVIDE = "÷";

let awaitingSecondOperand = false;
let awaitingNewOperation = false;
let firstOperand = null;
let secondOperand = null;
let globalOperator = null;

const output = document.querySelector("#output-display");
output.textContent = 0;

// All buttons change color when hovered over
const buttons = document.querySelectorAll("#keypad div");
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.cursor = "pointer";
    button.style.backgroundColor = "#c9c9c9";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "";
  });
});

// Handle all clear (AC) button
const ac = document.querySelector("#ac");
ac.addEventListener("click", () => {
  output.textContent = 0;
  firstOperand = null;
  secondOperand = null;
  globalOperator = null;
  answer = null;
});

// Handle digit button clicks
const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    // Override current display if display is 0 or waiting for second operand
    if (
      output.textContent == "0" ||
      awaitingSecondOperand ||
      awaitingNewOperation
    ) {
      awaitingSecondOperand = false;
      awaitingNewOperation = false;
      output.textContent = "";
    }
    output.textContent += digit.textContent;
  });
});

// Handle operator button clicks
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    globalOperator = operator.textContent;
    firstOperand = parseInt(output.textContent);
    awaitingSecondOperand = true;
  });
});

// Handle equal button click
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  // Check for special cases
  if (globalOperator != null) {
    if (awaitingSecondOperand) {
      secondOperand = firstOperand;
    } else {
      secondOperand = output.textContent;
    }

    // Operate and display output
    output.textContent = operate(
      globalOperator,
      parseInt(firstOperand),
      parseInt(secondOperand)
    );

    // Reset variables
    firstOperand = null;
    secondOperand = null;
    globalOperator = null;
    awaitingNewOperation = true;
  }
});

// FUNCTIONS

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
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
