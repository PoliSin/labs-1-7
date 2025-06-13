// Находим нужные элементы на странице
const sizeInput = document.getElementById('sideSize') as HTMLInputElement;
const calcBtn = document.getElementById('calcButton') as HTMLButtonElement;
const answerDiv = document.getElementById('answerBox') as HTMLDivElement;

// Функция для расчета объема
function getDodecahedronVolume(a: number): number {
    // Формула объема додекаэдра
    const part1 = 15 + 7 * Math.sqrt(5);
    const part2 = part1 / 4;
    const part3 = Math.pow(a, 3);
    return part2 * part3;
}

// Когда нажали кнопку
calcBtn.onclick = function() {
    // Берем значение из поля
    const sizeText = sizeInput.value;
    
    // Проверяем, что что-то введено
    if (sizeText === '') {
        answerDiv.textContent = 'Нужно ввести число!';
        answerDiv.style.color = 'red';
        return;
    }
    
    // Пробуем сделать числом
    const sizeNum = parseFloat(sizeText);
    
    // Проверяем число
    if (isNaN(sizeNum)) {
        answerDiv.textContent = 'Это не число!';
        answerDiv.style.color = 'red';
        return;
    }
    
    if (sizeNum <= 0) {
        answerDiv.textContent = 'Число должно быть больше нуля!';
        answerDiv.style.color = 'red';
        return;
    }
    
    // Считаем объем
    const volume = getDodecahedronVolume(sizeNum);
    
    // Показываем ответ
    answerDiv.textContent = `Объем: ${volume.toFixed(2)} кубических метров`;
    answerDiv.style.color = 'green';
};