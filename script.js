const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "×";
const DIVIDE = "÷";
const MAX_DISPLAY_CHARACTERS = 9;

let firstOperand = null;
let secondOperand = null;
let globalOperator = null;

let awaitingSecondOperand = false; // flag triggered after choosing operator
let awaitingNewOperation = false; // flag triggered after clicking equals sign

// Initialise output display
const output = document.querySelector("#output-display");
changeOutput(0);

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
const acButton = document.querySelector("#ac");
ac.addEventListener("click", () => {
  changeOutput(0);
  resetVariables();
});

// Handle digit button clicks
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", () => {
    // Conditions for wiping existing display
    if (
      output.textContent == "0" ||
      awaitingSecondOperand ||
      awaitingNewOperation
    ) {
      awaitingSecondOperand = false;
      awaitingNewOperation = false;
      changeOutput("");
    }
    // Append entered digits
    appendOutput(digitButton.textContent);
  });
});

// Handle operator button clicks
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    if (globalOperator == null) {
      // no pending operations
      firstOperand = parseFloat(output.textContent);
    } else {
      // pending operation: evaluate first before using next operator
      firstOperand = evaluate();
    }
    globalOperator = operatorButton.textContent;
    awaitingSecondOperand = true;
  });
});

// Handle equal button click
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
  if (globalOperator != null) {
    evaluate();
    resetVariables();
    awaitingNewOperation = true;
  }
});

//  Handle plus-minus button click
const plusMinusButton = document.querySelector("#plus-minus");
plusMinusButton.addEventListener("click", () => {
  changeOutput(multiply(output.textContent, -1));
});

// Handle percentage button click
const percentageButton = document.querySelector("#percentage");
percentageButton.addEventListener("click", () => {
  changeOutput(divide(output.textContent, 100));
});

// Handle decimal button click
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  appendOutput(".");
});

// FUNCTIONS //

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

function resetVariables() {
  firstOperand = null;
  secondOperand = null;
  globalOperator = null;
}

function evaluate() {
  // Let the second operand equal the first if not entered
  if (awaitingSecondOperand) {
    secondOperand = firstOperand;
  } else {
    secondOperand = output.textContent;
  }

  // Operate and display output
  changeOutput(
    operate(globalOperator, parseFloat(firstOperand), parseFloat(secondOperand))
  );

  return output.textContent;
}

function formatOutput(number) {
  let result = number.toString();
  if (result.length > MAX_DISPLAY_CHARACTERS) {
    result = number.toExponential(2);
  }
  return result;
}

function changeOutput(value) {
  output.textContent = formatOutput(value);
}

function appendOutput(value) {
  let newOutput = output.textContent + value;
  if (value !== ".") {
    newOutput = parseFloat(newOutput);
  }
  output.textContent = formatOutput(newOutput);
}
