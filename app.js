// const { response } = require("express");

//bring in DOM elements
const title = document.getElementById('title');
const bigTotal = document.getElementById('bigTotal');
const userMiles = document.getElementById('userMiles');
const submit = document.getElementById('submit');
const lastRun = document.getElementById('lastRun'); //!this feels wrong
const milesRemaining = document.getElementById('milesRemaining');
const reqDailyAvgDiv = document.getElementById('reqDailyAvgDiv');
const reqDailyAvg = document.getElementById('reqDailyAvg');
const icon = document.getElementById('icon');
const message = document.getElementById('message');
const lastRunDiv = document.getElementById('lastRunDiv');
const milesRemainingDiv = document.getElementById('milesRemainingDiv');



//font awesome
const runIcon = `fas fa-running mx-2`;
const heartIcon = `far fa-heart mx-2`;
message.innerHTML = 'submit';

//datedif
let today = new Date();
let from_date = new Date('2021/12/31')
let difference = from_date>today ? from_date-today : today-from_date
let datedif = Math.floor(difference/(1000*3600*24));


                //api FETCH all <is this needed?
fetch('http://localhost:5000/stats')
.then( (response) => response.json() )
.then( function(json) {
// get the value out of the JSON
let lastID = json[json.length -1];
console.log(lastID.id);
let run_length = userMiles.value;
let run_total = lastID.run_total;
let run_date = Date();
let stats = json;
let getStats = function(stats){
    console.log(stats);
};
getStats(stats);
//

}
);


                //api FETCH run_total
fetch('http://localhost:5000/stats/run_total')
.then( (response) => response.json() )
.then( function(json) {
// get the value out of the JSON
let runTotal = json[0];
//push stats into DOM
//set total
let setTotal = function(runTotal){
    bigTotal.innerHTML = runTotal;
}
setTotal(runTotal.run_total);
//set milesRemaining
let setMilesRemaining = function(runTotal){
    milesRemaining.innerHTML = (2021 - runTotal);
}
setMilesRemaining(runTotal.run_total);
console.log(runTotal.run_total);
//set reqDailyAvg
let setReqDailyAvg = function(runTotal, datedif) {
    let reqDaily = ((2021 - runTotal.run_total) / datedif);
    let roundDown = reqDaily.toFixed(2);
    reqDailyAvg.innerHTML = roundDown;
    console.log(2021-runTotal.run_total);
}
setReqDailyAvg(runTotal, datedif);
});

            //api POST
// fetch('http://localhost:5000/stats', {
//     method: 'POST',
//     body: JSON.stringify({
//     id: (lastID + 1),
//     run_length: userMiles.value,
//     run_total: userMiles.value + run_total,
//     })
// });

const newRun = function() {
let total = parseFloat(bigTotal.innerHTML);
let run_date = Date();
let run_length = parseFloat(lastRun.innerHTML);
    fetch('http://localhost:5000/stats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        run_date: Date(),
        run_length: run_length,
        run_total: run_length + total,
        }),
    });
};
const updateDisplay = function() {
    icon.className = heartIcon;
    lastRunDiv.classList.remove('collapse');
    lastRun.innerHTML = userMiles.value;
    milesRemainingDiv.classList.remove('collapse');
    milesRemaining.classList.remove('collapse');
    reqDailyAvgDiv.classList.remove('collapse');
    //submit.classList.add('disabled');
};

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
    newRun();
});

// 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/index.html'
// 'Access-Control-Allow-Methods': 'GET, POST, PUT'
// 'Access-Control-Allow-Headers': 'Content-Type'