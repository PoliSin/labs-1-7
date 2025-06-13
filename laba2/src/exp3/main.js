"use strict";
function isBadmintonPlayable(selectedDay, currentTemperature, currentPrecipitation, hasWind, currentHumidity) {
    if (selectedDay !== 'sunday') {
        return false;
    }
    if (currentTemperature === 'cold') {
        return false;
    }
    if (currentPrecipitation === 'rain' || currentPrecipitation === 'snow' || currentPrecipitation === 'hail') {
        return false;
    }
    if (hasWind === 'yes') {
        return false;
    }
    if (currentHumidity === 'high') {
        return false;
    }
    return true;
}
function checkBadmintonConditions() {
    const selectedDay = document.getElementById('dayOfWeek').value;
    const currentTemperature = document.getElementById('temperature').value;
    const currentPrecipitation = document.getElementById('precipitation').value;
    const hasWind = document.getElementById('wind').value;
    const currentHumidity = document.getElementById('humidity').value;
    const outputElement = document.getElementById('resultOutput');
    const canPlay = isBadmintonPlayable(selectedDay, currentTemperature, currentPrecipitation, hasWind, currentHumidity);
    if (canPlay) {
        outputElement.textContent = 'Да, можно играть в бадминтон!';
        outputElement.classList.remove('no');
    }
    else {
        outputElement.textContent = 'Нет, сегодня не играем в бадминтон.';
        outputElement.classList.add('no');
    }
}
