"use strict";
function findMedian() {
    const inputEl = document.getElementById("numberInput");
    const resultEl = document.getElementById("result");
    const inputText = inputEl.value.trim();
    // Проверка на недопустимые символы
    if (/[^0-9,\s.-]/.test(inputText)) {
        resultEl.textContent = "Ошибка: вводите только числа через запятую.";
        return;
    }
    const numberStrings = inputText.split(",").map(s => s.trim());
    const numbers = [];
    for (const str of numberStrings) {
        const num = parseFloat(str);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    }
    if (numbers.length === 0) {
        resultEl.textContent = "Ошибка: введите хотя бы одно число.";
        return;
    }
    // Сортируем числа
    numbers.sort((a, b) => a - b);
    // Вычисление медианы
    let median;
    const len = numbers.length;
    const mid = Math.floor(len / 2);
    if (len % 2 === 0) {
        median = (numbers[mid - 1] + numbers[mid]) / 2;
    }
    else {
        median = numbers[mid];
    }
    resultEl.textContent = `Медиана: ${median}`;
}
const button = document.getElementById("medianBtn");
button.addEventListener("click", findMedian);
