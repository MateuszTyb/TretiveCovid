const population = [{
    day: 0,
    infected: firstInfected.value * 1,
    sensible: populationSize.value * 1 - firstInfected.value * 1,
    dead: 0,
    resistant: 0,
    livePopulation: populationSize.value * 1,
    newInfected: 0,
    newDeadbyDay: 0,
}
    
    
];

const datapointsDead = [];
const datapointsPopulation = [];
const datapointsInfected = [];
const datapointsSensible = [];
const datapointsResistant = [];
const datapointsLivePopulation = [];
const datapointsNewDead = [];
const datapointsNewInfection = [];

for (let i = 1; i <= simulationLength.value; i++) {

    let deadTime = 0;
    let recoveryTime = 0;

    // Warunki dla mFactor

    if (deadTimeFactor.value >= i) {
        deadtime = 0;
    } else {
        deadTime = population[i - deadTimeFactor.value].newInfected;
    };

    let newDead = deadTime * mFactor.value;

    // Warunki dla Wyzdrowienia

    if (recoveryTimeFactor.value >= i) {
        recoveryTime = 0;
    } else {
        recoveryTime = population[i - recoveryTimeFactor.value].newInfected;
    };

    let newResistant = recoveryTime;



    newInfected = population[i - 1].infected * rFactor.value - population[i - 1].infected;

    if (newInfected > population[i - 1].sensible) {
        newInfected = population[i - 1].sensible;
    }
    else if (newInfected == population[i - 1].sensible) { newInfected = 0 }
    else {

    };



    const simulation = {
        day: i,
        infected: population[i - 1].infected + population[i - 1].newInfected - newDead - newResistant,
        sensible: population[i - 1].sensible - newInfected - newDead - newResistant,
        dead: population[i - 1].dead + newDead,
        resistant: population[i - 1].resistant + newResistant - newDead,
        livePopulation: population[i - 1].livePopulation - newDead,
        newInfected: newInfected,
        newDeadbyDay: newDead,
    };
    if (simulation.sensible <= 0) {
        simulation.sensible = 0;
    };
    if (simulation.infected <= 0) {
        simulation.infected = 0;
    }; if (simulation.resistant <= 0) {
        simulation.resistant = 0;
    };
    population.push(simulation);

    console.log(simulation);

    datapointsDead.push(Math.round(simulation.dead));
    datapointsPopulation.push(Math.round(simulation.population));
    datapointsLivePopulation.push(Math.round(simulation.livePopulation));
    datapointsInfected.push(Math.round(simulation.infected));
    datapointsSensible.push(Math.round(simulation.sensible));
    datapointsResistant.push(Math.round(simulation.resistant));
    datapointsNewDead.push(Math.round(simulation.newDeadbyDay));
    datapointsNewInfection.push(Math.round(simulation.newInfected));

};


exports.dataDead = datapointsDead;
exports.dataLivePopulation = datapointsLivePopulation;
exports.dataInfected = datapointsInfected;
exports.dataSensible = datapointsSensible;
exports.dataResistant = datapointsResistant;
exports.dataSensible = datapointsSensible;
exports.dataResistant = datapointsResistant;
exports.dataNewDead = datapointsNewDead;
exports.dataNewInfection = datapointsNewInfection;