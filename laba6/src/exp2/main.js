"use strict";
// Эта функция считает максимальную прибыль от покупки/продажи акций
function maxProfit(prices) {
    if (prices.length < 2)
        return 0;
    let minPrice = prices[0];
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        const profit = prices[i] - minPrice;
        if (profit > maxProfit) {
            maxProfit = profit;
        }
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }
    }
    return maxProfit;
}
// Получаем элементы со страницы
const input = document.getElementById('pricesInput');
const button = document.getElementById('calcButton');
const result = document.getElementById('result');
// Обработка нажатия кнопки
button.addEventListener('click', () => {
    const rawInput = input.value;
    const prices = rawInput.split(',').map(str => parseInt(str.trim(), 10));
    // Проверка на корректность
    if (prices.some(isNaN)) {
        result.textContent = 'Ошибка: Введите только числа через запятую.';
        return;
    }
    const profit = maxProfit(prices);
    result.textContent = `Максимальная прибыль: ${profit}`;
});
