

let simulationName = 0;
let populationSize = 0;
let firstInfected = 0;
let rFactor = 0;
let mFactor = 0;
let recoveryTimeFactor = 0;
let deadTimeFactor = 0;
let simulationLength = 0;


function getParameters() {

    simulationName = document.querySelector('#simulationName').value;
    populationSize = document.querySelector('#populationSize').value * 1;
    firstInfected = document.querySelector('#firstInfected').value * 1;
    rFactor = document.querySelector('#rFactor').value * 1;
    mFactor = document.querySelector('#mFactor').value * 1;
    recoveryTimeFactor = document.querySelector('#recoveryTimeFactor').value * 1;
    deadTimeFactor = document.querySelector('#deadTimeFactor').value * 1;
    simulationLength = document.querySelector('#simulationLength').value * 1;

};

getParameters()


//document.getElementsByClassName('simulationName__sub').innerHTML = "simulationName.value";
//document.getElementsByClassName('populationSize__sub').innerHTML = populationSize;
//document.getElementsByClassName('firstInfected__sub').innerHTML = "simulationName";
//document.getElementsByClassName('rFactor__sub').innerHTML = "simulationName";
//document.getElementsByClassName('mFactor__sub').innerHTML = "simulationName";
//document.getElementsByClassName('recoveryTimeFactor__sub').innerHTML = "simulationName";
//document.getElementsByClassName('deadTimeFactor__sub').innerHTML = "simulationName";
//document.getElementsByClassName('simulationLength__sub').innerHTML = "simulationName";

let population = {
    infected: 0,
    sensible: 0,
    dead: 0,
    resistant: 0,
};



document.getElementById("sub_btn").addEventListener("click", getParameters);


