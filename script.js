const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "0";
let previous = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    display.textContent = current;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!isNaN(value) || value === ".") {
            inputNumber(value);
        } else {
            handleOperator(value);
        }

        updateDisplay();
    });
});

function inputNumber(value) {
    if (shouldReset) {
        current = "0";
        shouldReset = false;
    }

    if (value === "." && current.includes(".")) return;

    if (current === "0" && value !== ".") {
        current = value;
    } else {
        current += value;
    }
}

function handleOperator(value) {

    if (value === "AC") {
        current = "0";
        previous = null;
        operator = null;
        shouldReset = false;
        return;
    }

    if (value === "+/-") {
        current = (parseFloat(current) * -1).toString();
        return;
    }

    if (value === "%") {
        current = (parseFloat(current) / 100).toString();
        return;
    }

    if (value === "=") {
        if (operator && previous !== null) {
            current = calculate(previous, current, operator);
            operator = null;
            previous = null;
            shouldReset = true;
        }
        return;
    }

    // + - * /
    if (operator && previous !== null && !shouldReset) {
        current = calculate(previous, current, operator);
    }

    previous = current;
    operator = value;
    shouldReset = true;
}

function calculate(a, b, op) {
    const x = parseFloat(a);
    const y = parseFloat(b);

    let result = 0;

    switch (op) {
        case "+":
            result = x + y;
            break;
        case "-":
            result = x - y;
            break;
        case "*":
            result = x * y;
            break;
        case "/":
            if (y === 0) return "Error";
            result = x / y;
            break;
    }

    return result.toString();
}

updateDisplay();