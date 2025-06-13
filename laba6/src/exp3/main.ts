function calculate(): void {
  const inputElement = document.getElementById("input") as HTMLInputElement;
  const input = inputElement.value.trim();

  // Проверка: допустимы только цифры, запятые и пробелы
  const validInputPattern = /^(\d+\s*,\s*)*\d+\s*$/;

  if (!validInputPattern.test(input)) {
    alert("Ошибка ввода: используйте только целые числа, разделённые запятыми. Пример: 1,2,3");
    return;
  }

  // Преобразуем строку в массив чисел
  const heights = input.split(",").map(s => Number(s.trim()));

  let maxArea = 0;
  let left = 0;
  let right = heights.length - 1;
  let bestLeft = 0;
  let bestRight = 0;

  while (left < right) {
    const height = Math.min(heights[left], heights[right]);
    const width = right - left;
    const area = height * width;

    if (area > maxArea) {
      maxArea = area;
      bestLeft = left;
      bestRight = right;
    }

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  document.getElementById("result")!.textContent = maxArea.toString();
  drawChart(heights, bestLeft, bestRight);
}

function drawChart(heights: number[], leftIndex: number, rightIndex: number): void {
  const canvas = document.getElementById("chart") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const barWidth = width / heights.length;

  for (let i = 0; i < heights.length; i++) {
    const barHeight = heights[i] * 10;
    ctx.fillStyle = (i === leftIndex || i === rightIndex) ? "blue" : "gray";
    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
  }

  const minHeight = Math.min(heights[leftIndex], heights[rightIndex]) * 10;
  const startX = leftIndex * barWidth;
  const waterWidth = (rightIndex - leftIndex) * barWidth;
  ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
  ctx.fillRect(startX, height - minHeight, waterWidth, minHeight);
}

