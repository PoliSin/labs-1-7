// Получаем элементы со страницы
const inputElement = document.getElementById('input') as HTMLTextAreaElement;
const outputElement = document.getElementById('output') as HTMLPreElement;
const button = document.getElementById('process') as HTMLButtonElement;

button.addEventListener('click', () => {
  const rawInput = inputElement.value.trim();
  const lines = rawInput.split('\n');

  const buyers = new Map<string, Map<string, number>>();

  for (const line of lines) {
    const parts = line.trim().split(' ');
    if (parts.length !== 3) continue;

    const [buyer, product, countStr] = parts;
    const count = parseInt(countStr);

    if (!buyers.has(buyer)) {
      buyers.set(buyer, new Map());
    }

    const products = buyers.get(buyer)!;

    if (products.has(product)) {
      products.set(product, products.get(product)! + count);
    } else {
      products.set(product, count);
    }
  }

  // Формируем результат
  const sortedBuyers = Array.from(buyers.keys()).sort();
  let result = '';

  for (const buyer of sortedBuyers) {
    result += `${buyer}:\n`;
    const products = buyers.get(buyer)!;
    const sortedProducts = Array.from(products.keys()).sort();

    for (const product of sortedProducts) {
      result += `${product} ${products.get(product)}\n`;
    }
  }

  outputElement.textContent = result;
});

