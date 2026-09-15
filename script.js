const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = null;
let operator = null;
let freshInput = false;

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // AC
        if (value === "AC") {
            display.textContent = "0";
            firstNumber = null;
            operator = null;
            freshInput = false;
            return;
        }

        // Percentage
        if (value === "%") {
            display.textContent = Number(display.textContent) / 100;
            return;
        }

        // Plus/Minus toggle
        if (value === "+/-") {
            display.textContent = Number(display.textContent) * -1;
            return;
        }

        // Decimal
        if (value === ".") {
            if (freshInput) {
                display.textContent += ".";
                freshInput = false;
            } else if (!display.textContent.split(/ \+ | − | × | ÷ /).pop().includes(".")) {
                display.textContent += ".";
            }
            return;
        }

        // Operators
        if (value === "+" || value === "−" || value === "×" || value === "÷") {
            if (operator && !freshInput) {
                const parts = display.textContent.split(` ${operator} `);
                const secondNumber = Number(parts[1]);
                let result;
                if (operator === "+") result = firstNumber + secondNumber;
                if (operator === "−") result = firstNumber - secondNumber;
                if (operator === "×") result = firstNumber * secondNumber;
                if (operator === "÷") result = firstNumber / secondNumber;
                firstNumber = result;
                display.textContent = result + " " + value + " ";
            } else {
                firstNumber = Number(display.textContent);
                display.textContent = display.textContent + " " + value + " ";
            }
            operator = value;
            freshInput = true;
            return;
        }

        // Equals
        if (value === "=") {
            if (operator === null) return;
            const parts = display.textContent.split(` ${operator} `);
            const secondNumber = Number(parts[1]);
            let result;
            if (operator === "+") result = firstNumber + secondNumber;
            if (operator === "−") result = firstNumber - secondNumber;
            if (operator === "×") result = firstNumber * secondNumber;
            if (operator === "÷") result = firstNumber / secondNumber;

            display.textContent = result;
            firstNumber = null;
            operator = null;
            freshInput = false;
            return;
        }

        // Numbers
        if (freshInput) {
            display.textContent += value;
            freshInput = false;
        } else if (display.textContent.trim() === "0") {
            display.textContent = value;
        } else {
            display.textContent += value;
        }

    });

});