// const { response } = require("express");

//bring in DOM elements
const title = document.getElementById('title');
const bigTotal = document.getElementById('bigTotal');
const userMiles = document.getElementById('userMiles');
const submit = document.getElementById('submit');
const lastRun = document.getElementById('lastRun'); //!this feels wrong
const milesRemaining = document.getElementById('milesRemaining');
const dailyAvg = document.getElementById('dailyAvg');
const reqDailyAvg = document.getElementById('reqDailyAvg');
const icon = document.getElementById('icon');
const message = document.getElementById('message');
const today = document.getElementById('today');
const left = document.getElementById('left');
const printTotal = document.getElementById('printTotal');

//font awesome
const runIcon = `fas fa-running mx-2`;
const heartIcon = `far fa-heart mx-2`;
message.innerHTML = 'submit';

//api fetch


//button switcher
submit.addEventListener('click', function(){

    if (userMiles.value == 0) {
        message.innerHTML = 'maybe tomorrow?';
    }
    else if (userMiles.value >= 1 && userMiles.value <= 5) {
        message.innerHTML = 'okok!';
    }
    else if (userMiles.value >= 6 && userMiles.value <= 9) {
        message.innerHTML = 'respect!';
    }
    else if (userMiles.value >= 10) {
        message.innerHTML = 'oh nice!!';
    }
    updateDisplay();

});

const updateDisplay = function(){
    icon.className = heartIcon;
    today.classList.remove('collapse');
    // today.innerHTML = ;
//left.classList.remove('collapse');
left.innerHTML = (2021 - runTotal);
lastRun.innerHTML = userMiles.value;
// submit.classList.add('disabled');
}

getStats(){
    const response = fetch('http//localhost:5000/run_total/run_total');
    const runTotal = response.json();
    left.innerHTML = (2021 - runTotal);
    return runTotal;
    }