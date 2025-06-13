function countMaxNumbers(): void {
  const inputEl = document.getElementById("numberInput") as HTMLInputElement;
  const resultEl = document.getElementById("result") as HTMLParagraphElement;

  const inputText = inputEl.value.trim();

  // Проверка на наличие недопустимых символов (!, @, a, и т.д.)
  if (/[^0-9,\s.-]/.test(inputText)) {
    resultEl.textContent = "Ошибка: вводите только числа, разделённые запятыми.";
    return;
  }

  // Преобразование строки в массив чисел
  const numberStrings = inputText.split(",").map(s => s.trim());
  const numbers: number[] = [];

  for (const str of numberStrings) {
    const num = parseFloat(str);
    if (!isNaN(num)) {
      numbers.push(num);
    }
  }

  if (numbers.length === 0) {
    resultEl.textContent = "Введите хотя бы одно число.";
    return;
  }

  // Поиск максимума и подсчёт
  const max = Math.max(...numbers);
  const count = numbers.filter(n => n === max).length;

  resultEl.textContent = `Максимальное число: ${max}, количество таких чисел: ${count}`;
}

// Назначение обработчика кнопке
const button = document.getElementById("countBtn") as HTMLButtonElement;
button.addEventListener("click", countMaxNumbers);