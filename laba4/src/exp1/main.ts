function countOccurrences(sub: string, text: string): number {
  let count = 0;
  let index = text.indexOf(sub);
  while (index !== -1) {
    count++;
    index = text.indexOf(sub, index + 1);
  }
  return count;
}

window.onload = () => {
  const needleInput = document.getElementById('needle') as HTMLInputElement;
  const haystackInput = document.getElementById('haystack') as HTMLTextAreaElement;
  const resultDiv = document.getElementById('result') as HTMLDivElement;
  const button = document.getElementById('countBtn') as HTMLButtonElement;

  button.onclick = () => {
    const needle = needleInput.value.trim();
    const haystacks = haystackInput.value.trim().split(/\s+/);
    let total = 0;

    for (let line of haystacks) {
      total += countOccurrences(needle, line);
    }

    resultDiv.textContent = `Количество вхождений: ${total}`;
  };
};