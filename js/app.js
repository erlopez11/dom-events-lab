/*-------------------------------- Constants --------------------------------*/
const calculator = document.getElementById('calculator');
const displayElement = document.querySelector('.display');
const displayHistoryElement = document.querySelector('.displayHistory')
const buttonElements = document.querySelector('.button');



/*-------------------------------- Variables --------------------------------*/
let firstOperand = null;
let secondOperand = null;
let operator = null;
let resetScreen = false;







/*------------------------ Cached Element References ------------------------*/





/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener('click', (event) => {
    toggleButtonActive(event.target);
    if (event.target.classList.contains('number')) {

        displayNumber(event.target.textContent);

    }

    if (event.target.classList.contains('operator')) {

        displayOperator(event.target.textContent);


    }

    if (event.target.classList.contains('equals')) {

        if (firstOperand !== null && operator !== null) {

            evaluateOperation();
        }


    }

    if (event.target.classList.contains('clear')) {

        clearAll();
    }
})




/*-------------------------------- Functions --------------------------------*/
function performOperation(operator, a, b) {
    let num1 = Number(a);
    let num2 = Number(b);
    let result = null;
    let errorMessage = 'undefined';

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                return errorMessage;
            } else {
                result = num1 / num2;
            }
            break;
    }
    return setDecimalPlacesLimit(result);
}

function displayNumber(number) {
    let numberDisplayed = displayElement.textContent;

    if (displayElement.textContent === null || resetScreen === true) {
        resetDisplay();
        displayElement.textContent = number;
    } else {
        displayElement.textContent = numberDisplayed + number;
    }
}

function displayOperator(currentOperator) {

    if (operator !== null && firstOperand !== null) {

        displayElement.textContent = performOperation(operator, firstOperand, displayElement.textContent);

    } 
    operator = currentOperator;
    firstOperand = displayElement.textContent;
    displayHistoryElement.textContent = firstOperand + operator;
    resetScreen = true;
}

function evaluateOperation() {
    secondOperand = displayElement.textContent;

    displayElement.textContent = performOperation(operator, firstOperand, secondOperand);
    displayHistoryElement.textContent = firstOperand + operator + secondOperand;

    firstOperand = null;
    operator = null;
    secondOperand = null;
    resetScreen = true;


}

function resetDisplay() {

    displayElement.textContent = null;
    resetScreen = false;

}

function clearAll() {
    
    displayElement.textContent = null;
    displayHistoryElement.textContent = null;
    operator = null;
    firstOperand = null;
    secondOperand = null;
}

function setDecimalPlacesLimit(result) {
    return Math.round(result * 1000) / 1000;
}

function toggleButtonActive(button) {
    const currentActiveButton = document.querySelector('.button.active')
    if (currentActiveButton) {
        currentActiveButton.classList.remove('active');
    }

    button.classList.add('active');
}