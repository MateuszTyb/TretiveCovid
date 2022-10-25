
const chartData = require('../scripts/simulator.js');

const dataDead = chartData.dataDead;
const dataLivePopulation = chartData.dataLivePopulation;
const dataInfected = chartData.dataInfected;
const dataSensible = chartData.dataSensible;
const dataResistant = chartData.dataResistant;
const dataNewDead = chartData.dataNewDead;
const dataNewInfection = chartData.dataNewInfection;





const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)', black: 'rgb(0, 0, 0)'
};


const DATA_COUNT = simulationLength.value;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
};

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Osoby Zmarłe',
            data: dataDead,
            borderColor: CHART_COLORS.red,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Populacja',
            data: dataLivePopulation,
            borderColor: CHART_COLORS.orange,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Zainfekowani',
            data: dataInfected,
            borderColor: CHART_COLORS.yellow,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Osoby Podatne',
            data: dataSensible,
            borderColor: CHART_COLORS.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Osoby Odporne',
            data: dataResistant,
            borderColor: CHART_COLORS.green,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y',
        },
        {
            label: 'Nowi Zmarli',
            data: dataNewDead,
            borderColor: CHART_COLORS.black,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.8,
            yAxisID: 'y1',
        },
        {
            label: 'Nowe Zakarzenia',
            data: dataNewInfection,
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