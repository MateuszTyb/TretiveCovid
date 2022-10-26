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

let datapointsDead = [];
let datapointsPopulation = [];
let datapointsInfected = [];
let datapointsSensible = [];
let datapointsResistant = [];
let datapointsLivePopulation = [];
let datapointsNewDead = [];
let datapointsNewInfection = [];

const form = document.querySelector(".simulationParameters-form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
    event.preventDefault()

    datapointsDead = [];
    datapointsPopulation = [];
    datapointsInfected = [];
    datapointsSensible = [];
    datapointsResistant = [];
    datapointsLivePopulation = [];
    datapointsNewDead = [];
    datapointsNewInfection = [];






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
    simulator()

};




function simulator() {

    const population = [{
        day: 0,
        infected: parameters.firstInfectedVar,
        sensible: 0,
        dead: 0,
        resistant: 0,
        livePopulation: parameters.populationSizeVar,
        newInfected: 0,
        newDeadbyDay: 0,
    }];

    population[0].sensible = parameters.populationSizeVar - parameters.firstInfectedVar;


    for (let i = 1; i <= parameters.simulationLengthVar; i++) {

        let deadTime = 0;
        let recoveryTime = 0;

        if (parameters.deadTimeFactorVar >= i) {
            deadtime = 0;
        } else {
            deadTime = population[i - parameters.deadTimeFactorVar].newInfected;
        };

        let newDead = deadTime * parameters.mFactorVar;


        if (parameters.recoveryTimeFactorVar >= i) {
            recoveryTime = 0;
        } else {
            recoveryTime = population[i - parameters.recoveryTimeFactorVar].newInfected;
        };

        let newResistant = recoveryTime;

        let newInfected = population[i - 1].infected * parameters.rFactorVar - population[i - 1].infected;

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

        console.log(datapointsDead)

    };

    const CHART_COLORS = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(100, 100, 100)',
        white: 'rgb(255, 255, 255)'
    };

    function chartCreatror() {
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



        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    }

    chartCreatror()

    const deadRound = Math.round(population[parameters.simulationLengthVar - 1].dead)
    const deadPar = document.querySelector(".parameters__dead");
    const dead = [deadRound];
    const markupDead = dead
        .map((deadVal) => ` <p class="parameters__dead__value">${deadVal}</p>`)
        .join("");
    deadPar.insertAdjacentHTML("beforeend", markupDead);

    const aliveRound = Math.round(population[parameters.simulationLengthVar - 1].livePopulation)
    const alivePar = document.querySelector(".parameters__alive");
    const alive = [aliveRound];
    const markupAlive = alive
        .map((deadVal) => ` <p class="parameters__alive__value">${deadVal}</p>`)
        .join("");
    alivePar.insertAdjacentHTML("beforeend", markupAlive);



    const simulationNameAct = document.querySelector(".simulationName__sub");
    const NameAct = [parameters.simulationNameVar.toString()]
        .map((NameAct) => `${NameAct}`)
        .join("");
    simulationNameAct.insertAdjacentHTML("beforeend", NameAct);

    const simulationPopAct = document.querySelector(".populationSize__sub");
    const PopAct = [parameters.populationSizeVar]
        .map((PopAct) => `${PopAct}`)
        .join("");
    simulationPopAct.insertAdjacentHTML("beforeend", PopAct);

    const simulationInfAct = document.querySelector(".firstInfected__sub");
    const InfAct = [parameters.populationSizeVar]
        .map((InfAct) => `${InfAct}`)
        .join("");
    simulationInfAct.insertAdjacentHTML("beforeend", InfAct);

    const simulationRAct = document.querySelector(".rFactor__sub");
    const rAct = [parameters.rFactorVar]
        .map((rAct) => `${rAct}`)
        .join("");
    simulationRAct.insertAdjacentHTML("beforeend", rAct);

    const simulationMAct = document.querySelector(".mFactor__sub");
    const mAct = [parameters.mFactorVar]
        .map((mAct) => `${mAct}`)
        .join("");
    simulationMAct.insertAdjacentHTML("beforeend", mAct);

    const simulationRecAct = document.querySelector(".recoveryTimeFactor__sub");
    const racAct = [parameters.recoveryTimeFactorVar]
        .map((racAct) => `${racAct}`)
        .join("");
    simulationRecAct.insertAdjacentHTML("beforeend", racAct);

    const simulationDeadAct = document.querySelector(".deadTimeFactor__sub");
    const DeadAct = [parameters.deadTimeFactorVar]
        .map((DeadAct) => `${DeadAct}`)
        .join("");
    simulationDeadAct.insertAdjacentHTML("beforeend", DeadAct);

    const simulationLengthAct = document.querySelector(".simulationLength__sub");
    const LengthAct = [parameters.simulationLengthVar]
        .map((LengthAct) => `${LengthAct}`)
        .join("");
    simulationLengthAct.insertAdjacentHTML("beforeend", LengthAct);

}
