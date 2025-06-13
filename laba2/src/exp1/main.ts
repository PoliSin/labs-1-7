
function getAgeDeclension(yearsCount: number): string {
    const lastDigit = yearsCount % 10;
    const lastTwoDigits = yearsCount % 100;

    // Исключения для чисел 11-19
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'лет';
    }

    // Для чисел, оканчивающихся на 1
    if (lastDigit === 1) {
        return 'год';
    }

    // Для чисел, оканчивающихся на 2-4
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
    }

    // Все остальные случаи
    return 'лет';
}


function handleResultButtonClick(): void {
    const ageInputElement = document.getElementById('user-age') as HTMLInputElement;
    const outputElement = document.getElementById('age-output') as HTMLOutputElement;
    
    const userAge = parseInt(ageInputElement.value);
    
    if (isNaN(userAge) || userAge < 0) {
        outputElement.textContent = 'Пожалуйста, введите корректный возраст';
        outputElement.classList.add('error-message');
        return;
    }
    
    outputElement.classList.remove('error-message');
    const ageWord = getAgeDeclension(userAge);
    outputElement.textContent = `Ваш возраст: ${userAge} ${ageWord}`;
}

// Инициализация приложения после загрузки DOM
function initializeApp(): void {
    const resultButton = document.getElementById('show-result') as HTMLButtonElement;
    resultButton.addEventListener('click', handleResultButtonClick);
}

document.addEventListener('DOMContentLoaded', initializeApp);