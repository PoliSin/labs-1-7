"use strict";
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight);
}
function merge(left, right) {
    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        }
        else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    while (leftIndex < left.length) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
    }
    while (rightIndex < right.length) {
        resultArray.push(right[rightIndex]);
        rightIndex++;
    }
    return resultArray;
}
function sortAndDisplay() {
    const inputElement = document.getElementById('arrayInput');
    const resultElement = document.getElementById('sortedResult');
    const errorElement = document.getElementById('errorOutput');
    errorElement.textContent = '';
    const inputValue = inputElement.value;
    const forbiddenCharsRegex = /[^\d,\s-]/;
    if (forbiddenCharsRegex.test(inputValue)) {
        errorElement.textContent = 'Ошибка: Введены недопустимые символы. Пожалуйста, вводите только числа, разделенные запятыми или пробелами.';
        resultElement.textContent = '';
        return;
    }
    const stringArray = inputValue.split(/[,\s]+/).filter(s => s.trim() !== '');
    const numbersArray = [];
    for (const str of stringArray) {
        const num = parseFloat(str);
        if (isNaN(num)) {
            errorElement.textContent = 'Ошибка: Введены нечисловые значения. Пожалуйста, вводите только числа.';
            resultElement.textContent = '';
            return;
        }
        numbersArray.push(num);
    }
    if (numbersArray.length === 0) {
        errorElement.textContent = 'Пожалуйста, введите числа для сортировки.';
        resultElement.textContent = '';
        return;
    }
    const sortedArray = mergeSort(numbersArray);
    resultElement.textContent = `Отсортированный массив: [${sortedArray.join(', ')}]`;
}
document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sortButton');
    if (sortButton) {
        sortButton.addEventListener('click', sortAndDisplay);
    }
    else {
        console.error('Кнопка с id="sortButton" не найдена.');
    }
});
