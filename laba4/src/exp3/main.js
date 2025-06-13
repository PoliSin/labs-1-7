"use strict";
function calculateAverageTemperatures(input) {
    const readings = input.split('@');
    const data = {};
    for (const reading of readings) {
        const id = reading.slice(0, 2);
        const tempStr = reading.slice(2);
        const temp = parseInt(tempStr);
        if (!isNaN(temp) && temp >= -50 && temp <= 50) {
            if (!data[id]) {
                data[id] = [];
            }
            data[id].push(temp);
        }
    }
    const result = [];
    for (const id in data) {
        const temps = data[id];
        const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
        result.push({ id, avgTemp: parseFloat(avg.toFixed(1)) });
    }
    return result;
}
function handleClick() {
    const inputElement = document.getElementById('inputData');
    const sortByElement = document.getElementById('sortBy');
    const outputElement = document.getElementById('output');
    const inputText = inputElement.value.trim().slice(0, 512);
    const sortBy = sortByElement.value;
    if (inputText === '') {
        outputElement.textContent = 'Введите строку с данными.';
        return;
    }
    let result = calculateAverageTemperatures(inputText);
    if (sortBy === 'id') {
        result.sort((a, b) => Number(a.id) - Number(b.id));
    }
    else if (sortBy === 'temp') {
        result.sort((a, b) => a.avgTemp - b.avgTemp);
    }
    const outputText = result.map(r => `${r.id} ${r.avgTemp}`).join('\n');
    outputElement.textContent = outputText;
}
