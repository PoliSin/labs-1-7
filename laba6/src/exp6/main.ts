function fibClassic(n: number): number {
  if (n <= 1) return n;
  return fibClassic(n - 1) + fibClassic(n - 2);
}

const cache = new Map<number, number>();
function fibOptimized(n: number): number {
  if (n <= 1) return n;
  if (cache.has(n)) return cache.get(n)!;
  const value = fibOptimized(n - 1) + fibOptimized(n - 2);
  cache.set(n, value);
  return value;
}

function measureTime(fn: (n: number) => number, n: number): number {
  const start = performance.now();
  fn(n);
  const end = performance.now();
  return end - start;
}

const xValues: number[] = [];
const yClassic: number[] = [];
const yOptimized: number[] = [];

for (let i = 10; i <= 40; i += 2) {
  xValues.push(i);
  yClassic.push(measureTime(fibClassic, i));
  yOptimized.push(measureTime(fibOptimized, i));
}

// @ts-ignore
new Chart(document.getElementById('fibChart'), {
  type: 'line',
  data: {
    labels: xValues,
    datasets: [
      {
        label: 'Классическая реализация',
        data: yClassic,
        borderColor: 'red',
        fill: false
      },
      {
        label: 'С кешированием',
        data: yOptimized,
        borderColor: 'green',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Сравнение скорости вычисления чисел Фибоначчи'
      }
    }
  }
});
