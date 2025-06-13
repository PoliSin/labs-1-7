function calculateRoot(): void {
  const inputElement = document.getElementById('numberInput') as HTMLInputElement;
  const resultElement = document.getElementById('result') as HTMLParagraphElement;

  const number = parseFloat(inputElement.value);

  if (isNaN(number) || number < 0) {
    resultElement.textContent = "Введите корректное положительное число!";
    return;
  }

  // Начальное приближение (любое положительное число, например, само число)
  let x = number;
  let guess = number / 2;
  let epsilon = 0.000001;

  // Формула Герона: x_(n+1) = (x_n + A / x_n) / 2
  while (Math.abs(guess * guess - number) > epsilon) {
    guess = (guess + number / guess) / 2;
  }

  resultElement.textContent = `Приближённый корень: ${guess.toFixed(6)}`;
}