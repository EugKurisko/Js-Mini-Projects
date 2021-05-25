const calculate = document.querySelector('#loan-form').addEventListener('submit', calculation);

function calculation(e) {
    e.preventDefault();
    let loan = document.querySelector('#amount').value;
    let interest = document.querySelector('#interest').value;
    let years = document.querySelector('#years').value;

    if (!loan || !years || !interest) {
        let error = document.createElement('span'); //.classList.remove('d-none');
        error.setAttribute('class', 'alert alert-danger');
        error.appendChild(document.createTextNode('Please enter data'));
        const heading = document.querySelector('.heading');
        const card = document.querySelector('.card');
        card.insertBefore(error, heading);
        setTimeout(clearError, 3000);
        return;
    }

    let load = document.querySelector('#loading');
    let result = document.querySelector('#results');
    result.style.display = 'none';
    load.style.display = 'block';

    setTimeout(function () {
        load.style.display = 'none';
        result.style.display = 'block';
    }, 1000);
    let monthlyPayment = document.querySelector('#monthly-payment');
    let totalPayment = document.querySelector('#total-payment');
    let totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(loan);
    const calculatedInterest = parseFloat(interest) / 100 / 12;
    const calculatedPayments = parseFloat(years) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);//loan * (ratePerPeriod * (1 + ratePerPeriod) * paymentPeriods) / ((1 + ratePerPeriod) * paymentPeriods - 1);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthlyPayment.value * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    }

    monthlyPayment.appendChild(document.createTextNode(monthlyPayment.value));
}

function clearError() {
    document.querySelector('.alert').remove();
}