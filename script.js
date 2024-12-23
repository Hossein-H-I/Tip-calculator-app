// Select DOM elements
const billInput = document.getElementById('bill-price');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalDisplay = document.getElementById('total');
const resetButton = document.getElementById('reset');
const errorMessage = document.getElementById('error-message');

// Function to calculate tip and total
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    let tipPercentage = 0;

    // Validate inputs
    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    // Determine the selected tip percentage
    tipButtons.forEach(button => {
        if (button.classList.contains('active')) {
            tipPercentage = parseFloat(button.value) / 100;
        }
    });

    // Check for custom tip
    if (customTipInput.value) {
        tipPercentage = parseFloat(customTipInput.value) / 100;
    }

    // Calculate tip and total per person
    const tipAmount = (bill * tipPercentage) / people;
    const totalAmount = (bill + (bill * tipPercentage)) / people;

    // Update the display
    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// Function to reset the calculator
function resetCalculator() {
    billInput.value = '';
    peopleInput.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    customTipInput.value = '';
    tipButtons.forEach(button => button.classList.remove('active'));
    errorMessage.style.display = 'none';
}

// Event listeners for tip buttons
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        calculateTip();
    });
});

// Event listener for custom tip input
customTipInput.addEventListener('input', () => {
    tipButtons.forEach(button => button.classList.remove('active'));
    calculateTip();
});

// Event listener for people input
peopleInput.addEventListener('input', calculateTip);

// Event listener for reset button
resetButton.addEventListener('click', resetCalculator);