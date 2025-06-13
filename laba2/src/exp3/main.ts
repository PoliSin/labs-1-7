function isBadmintonPlayable(selectedDay: string, currentTemperature: string, currentPrecipitation: string, hasWind: string, currentHumidity: string): boolean {
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

function checkBadmintonConditions(): void {
    const selectedDay = (document.getElementById('dayOfWeek') as HTMLSelectElement).value;
    const currentTemperature = (document.getElementById('temperature') as HTMLSelectElement).value;
    const currentPrecipitation = (document.getElementById('precipitation') as HTMLSelectElement).value;
    const hasWind = (document.getElementById('wind') as HTMLSelectElement).value;
    const currentHumidity = (document.getElementById('humidity') as HTMLSelectElement).value;
    const outputElement = document.getElementById('resultOutput') as HTMLParagraphElement;

    const canPlay = isBadmintonPlayable(selectedDay, currentTemperature, currentPrecipitation, hasWind, currentHumidity);

    if (canPlay) {
        outputElement.textContent = 'Да, можно играть в бадминтон!';
        outputElement.classList.remove('no');
    } else {
        outputElement.textContent = 'Нет, сегодня не играем в бадминтон.';
        outputElement.classList.add('no');
    }
}