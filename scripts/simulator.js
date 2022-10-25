let parameters = {
    simulationNameVar: 0,
    populationSizeVar: 0,
    firstInfectedVar: 0,
    rFactorVar: 0,
    mFactorVar: 0,
    recoveryTimeFactorVar: 0,
    deadTimeFactorVar: 0,
    simulationLengthVar: 0,
}


const form = document.querySelector(".simulationParameters-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault()



    const {
        elements: { simulationName, populationSize, firstInfected, rFactor, mFactor, recoveryTimeFactor, deadTimeFactor, simulationLength }
    } = event.currentTarget;

    parameters.simulationNameVar = Number(simulationName.value);
    parameters.populationSizeVar = Number(populationSize.value);
    parameters.firstInfectedVar = Number(firstInfected.value);
    parameters.rFactorVar = Number(rFactor.value);
    parameters.mFactorVar = Number(mFactor.value);
    parameters.recoveryTimeFactorVar = Number(recoveryTimeFactor.value);
    parameters.deadTimeFactorVar = Number(deadTimeFactor.value);
    parameters.simulationLengthVar = Number(simulationLength.value);

    event.currentTarget.reset();
    popref()
    simulator()

}


let population = [{
    day: 0,
    infected: 0,
    sensible: 0,
    dead: 0,
    resistant: 0,
    livePopulation: 0,
    newInfected: 0,
    newDeadbyDay: 0,
}];


function popref() {
    population.day = 0
    population.infected = Number(parameters.firstInfectedVar)
    population.sensible = Number(parameters.populationSizeVar - parameters.firstInfectedVar)
    population.dead = 0
    population.resistant = 0
    population.livePopulation = Number(parameters.populationSizeVar)
    population.newInfected = 0
    population.newDeadbyDay = 0
};
popref()



const datapointsDead = [];
const datapointsPopulation = [];
const datapointsInfected = [];
const datapointsSensible = [];
const datapointsResistant = [];
const datapointsLivePopulation = [];
const datapointsNewDead = [];
const datapointsNewInfection = [];


function simulator() {
    for (let i = 1; i <= parameters.simulationLengthVar; i++) {

        console.log(population)

        let deadTime = 0;
        let recoveryTime = 0;

        // Warunki dla mFactor

        if (parameters.deadTimeFactorVar >= i) {
            deadtime = 0;
        } else {
            deadTime = population[i - parameters.deadTimeFactorVar].newInfected;
        };

        let newDead = deadTime * parameters.mFactorVar;

        console.log(newDead + "newDead")
        console.log(parameters.mFactorVar + "mFactorVar")


        // Warunki dla Wyzdrowienia

        if (parameters.recoveryTimeFactorVar >= i) {
            recoveryTime = 0;
        } else {
            recoveryTime = population[i - parameters.recoveryTimeFactorVar].newInfected;
        };

        let newResistant = recoveryTime;

        console.log(newResistant + "newResistant")
        console.log(parameters.recoveryTimeFactorVar + "parameters.recoveryTimeFactorVar")

        let newInfected = population[i - 1].infected * parameters.rFactorVar - population[i - 1].infected;

        if (newInfected > population[i - 1].sensible) {
            newInfected = population[i - 1].sensible;
        }
        else if (newInfected == population[i - 1].sensible) { newInfected = 0 }
        else {

        };
        console.log(population.infected)
        console.log(newInfected + "newInfected")
        console.log(parameters.rFactorVar + "parameters.rFactorVar")

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
}


const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(100, 100, 100)', white: 'rgb(255, 255, 255)'
};


const DATA_COUNT = parameters.simulationLengthVar;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
};

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Osoby Zmarłe',
            data: datapointsDead,
            borderColor: CHART_COLORS.red,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Populacja',
            data: datapointsLivePopulation,
            borderColor: CHART_COLORS.orange,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Zainfekowani',
            data: datapointsInfected,
            borderColor: CHART_COLORS.yellow,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Osoby Podatne',
            data: datapointsSensible,
            borderColor: CHART_COLORS.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Osoby Odporne',
            data: datapointsResistant,
            borderColor: CHART_COLORS.green,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Nowi Zmarli',
            data: datapointsNewDead,
            borderColor: CHART_COLORS.white,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y1',
        },
        {
            label: 'Nowe Zakarzenia',
            data: datapointsNewInfection,
            borderColor: CHART_COLORS.grey,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y1',
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Sybulacja Zagłady Ludzkości'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',

                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        }
    },
};


function chartCreatror() {
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

