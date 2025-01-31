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
    button.style.opacity = "0.8";
  });
  button.addEventListener("mouseout", () => {
    button.style.opacity = "1";
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
    // Wipe display if one of these conditions are met:
    if (
      output.textContent == "0" ||
      awaitingSecondOperand ||
      awaitingNewOperation
    ) {
      awaitingSecondOperand = false;
      awaitingNewOperation = false;
      changeOutput("");
    }

    appendOutput(digitButton.textContent);
  });
});

// Handle decimal button click
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  if (awaitingSecondOperand || awaitingNewOperation) {
    awaitingSecondOperand = false;
    awaitingNewOperation = false;
    changeOutput("0");
  }

  if (output.textContent.slice(-1) !== decimalButton.textContent) {
    appendOutput(decimalButton.textContent);
  }
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
  if (awaitingSecondOperand || awaitingNewOperation) {
    awaitingSecondOperand = false;
    awaitingNewOperation = false;
  }
  changeOutput(multiply(output.textContent, -1));
});

// Handle percentage button click
const percentageButton = document.querySelector("#percentage");
percentageButton.addEventListener("click", () => {
  if (awaitingSecondOperand || awaitingNewOperation) {
    awaitingSecondOperand = false;
    awaitingNewOperation = false;
  }
  changeOutput(divide(output.textContent, 100));
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
  output.textContent = formatOutput(newOutput);
}
