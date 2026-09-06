const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = null;
let operator = null;

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // AC
        if (value === "AC") {
            display.textContent = "0";
            firstNumber = null;
            operator = null;
            return;
        }

        // Decimal
        if (value === ".") {
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            }
            return;
        }

        // Operators
        if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {
            firstNumber = Number(display.textContent);
            operator = value;
            display.textContent = "0";
            return;
        }

        // Equals
        if (value === "=") {

            const secondNumber = Number(display.textContent);

            if (operator === "+") {
                display.textContent = firstNumber + secondNumber;
            }

            if (operator === "−") {
                display.textContent = firstNumber - secondNumber;
            }

            if (operator === "×") {
                display.textContent = firstNumber * secondNumber;
            }

            if (operator === "÷") {
                display.textContent = firstNumber / secondNumber;
            }

            return;
        }

        // Numbers
        if (display.textContent.trim() === "0") {
            display.textContent = value;
        } else {
            display.textContent += value;
        }

    });

});