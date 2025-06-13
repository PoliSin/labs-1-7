function findMostFrequentChar(s: string): [string, number] {
  const frequencyMap: { [char: string]: number } = {};

  for (let char of s) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }

  let maxChar = '';
  let maxCount = 0;

  for (let char in frequencyMap) {
    if (frequencyMap[char] > maxCount) {
      maxChar = char;
      maxCount = frequencyMap[char];
    }
  }

  return [maxChar, maxCount];
}

// Работаем с HTML
const input = document.getElementById("textInput") as HTMLInputElement;
const button = document.getElementById("checkBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

button.addEventListener("click", () => {
  const inputValue = input.value;
  if (inputValue.trim() === '') {
    resultDiv.textContent = "Введите строку!";
    return;
  }

  const [char, count] = findMostFrequentChar(inputValue);
  resultDiv.textContent = `Самый частый символ: "${char}", количество: ${count}`;
});