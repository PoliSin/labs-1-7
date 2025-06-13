function calculateEntropy(text: string): number {
  const freqMap: Record<string, number> = {};
  const length = text.length;

  // Подсчёт частоты символов
  for (let char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }

  // Вычисление энтропии с использованием log(x) / LN2
  let entropy = 0;
  for (let char in freqMap) {
    const p = freqMap[char] / length;
    entropy -= p * (Math.log(p) / Math.LN2);
  }

  return entropy;
}

window.onload = () => {
  const input = document.getElementById("inputText") as HTMLTextAreaElement;
  const result = document.getElementById("result") as HTMLDivElement;
  const button = document.getElementById("calcButton") as HTMLButtonElement;

  button.onclick = () => {
    const text = input.value.trim();
    if (text.length === 0) {
      result.textContent = "Введите текст!";
      return;
    }

    const entropy = calculateEntropy(text);
    result.textContent = `Энтропия: ${entropy.toFixed(2)}`;
  };
};