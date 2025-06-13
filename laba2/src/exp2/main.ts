function checkIfLeapYear(currentYear: number): boolean {
    const divisibleBy400 = currentYear % 400 === 0;
    const divisibleBy100 = currentYear % 100 === 0;
    const divisibleBy4 = currentYear % 4 === 0;
    
    return divisibleBy400 || (!divisibleBy100 && divisibleBy4);
}


function calculateDaysInMonth(selectedMonth: number, selectedYear: number): number {
    const isValidMonth = selectedMonth >= 1 && selectedMonth <= 12;
    if (!isValidMonth) {
        throw new RangeError("Месяц должен быть числом от 1 до 12");
    }

    // Месяцы с фиксированным количеством дней
    const has31Days = selectedMonth === 1 || selectedMonth === 3 || 
                     selectedMonth === 5 || selectedMonth === 7 ||
                     selectedMonth === 8 || selectedMonth === 10 || 
                     selectedMonth === 12;
    
    const has30Days = selectedMonth === 4 || selectedMonth === 6 || 
                     selectedMonth === 9 || selectedMonth === 11;

    if (has31Days) return 31;
    if (has30Days) return 30;
    
    // Февраль зависит от високосности года
    return checkIfLeapYear(selectedYear) ? 29 : 28;
}


function getMonthNameInPrepositional(monthNumber: number): string {
    const monthNames = {
        1: "январе",
        2: "феврале",
        3: "марте",
        4: "апреле",
        5: "мае",
        6: "июне",
        7: "июле",
        8: "августе",
        9: "сентябре",
        10: "октябре",
        11: "ноябре",
        12: "декабре"
    };

    return monthNames[monthNumber as keyof typeof monthNames] || "неизвестном месяце";
}


function displayMonthDaysResult(): void {
    const monthInputField = document.getElementById('monthInput') as HTMLInputElement;
    const yearInputField = document.getElementById('yearInput') as HTMLInputElement;
    const resultOutput = document.getElementById('result') as HTMLParagraphElement;
    
    try {
        const enteredMonth = Number(monthInputField.value);
        const enteredYear = Number(yearInputField.value);
        
        const isMonthValid = !isNaN(enteredMonth) && enteredMonth >= 1 && enteredMonth <= 12;
        const isYearValid = !isNaN(enteredYear) && enteredYear > 0;
        
        if (!isMonthValid) throw new Error("Введите корректный номер месяца (1-12)");
        if (!isYearValid) throw new Error("Введите корректный год");
        
        const totalDays = calculateDaysInMonth(enteredMonth, enteredYear);
        const monthName = getMonthNameInPrepositional(enteredMonth);
        
        resultOutput.textContent = `В ${monthName} ${enteredYear} года ${totalDays} дней`;
        resultOutput.className = "result-output";
    } catch (error) {
        resultOutput.textContent = error instanceof Error ? error.message : "Ошибка вычисления";
        resultOutput.className = "result-output error";
    }
}


function setupEventListeners(): void {
    const calculateButton = document.getElementById('calculateBtn') as HTMLButtonElement;
    calculateButton.addEventListener('click', displayMonthDaysResult);
    
    // Добавляем обработчик нажатия Enter
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') displayMonthDaysResult();
        });
    });
}

// Запускаем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', setupEventListeners);