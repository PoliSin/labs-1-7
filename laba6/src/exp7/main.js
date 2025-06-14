"use strict";
const inputElement = document.getElementById("arrayInput");
const resultDiv = document.getElementById("result");
const button = document.getElementById("processBtn");
button.addEventListener("click", () => {
    const rawInput = inputElement.value.trim();
    if (!rawInput) {
        resultDiv.textContent = "Пожалуйста, введите числа через запятую.";
        return;
    }
    // Проверка: только цифры, запятые и пробелы допустимы
    const validPattern = /^[0-9,\s]+$/;
    if (!validPattern.test(rawInput)) {
        resultDiv.textContent = "Ошибка: ввод должен содержать только числа, запятые и пробелы.";
        return;
    }
    // Преобразуем ввод в массив чисел
    const inputArray = rawInput
        .split(",")
        .map(item => parseInt(item.trim(), 10))
        .filter(n => !isNaN(n));
    if (inputArray.length === 0) {
        resultDiv.textContent = "Ошибка: введите хотя бы одно корректное число.";
        return;
    }
    // Удаление дубликатов
    const uniqueArray = Array.from(new Set(inputArray));
    resultDiv.textContent = `Без дубликатов: ${uniqueArray.join(", ")}`;
});
