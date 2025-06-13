// Массив заказов
type Order = {
  id: number;
  date: string; // формат: 'YYYY-MM-DD'
  amount: number;
};

const orders: Order[] = [
  { id: 1, date: "2020-02-01", amount: 1200 },
  { id: 2, date: "2020-02-15", amount: 850 },
  { id: 3, date: "2020-03-10", amount: 500 },
  { id: 4, date: "2020-02-20", amount: 400 },
  { id: 5, date: "2019-02-10", amount: 300 }
];

function calculateFebruary2020Total(orders: Order[]): number {
  let total = 0;

  for (let order of orders) {
    const date = new Date(order.date);
    const isFeb2020 = date.getFullYear() === 2020 && date.getMonth() === 1; // январь = 0, февраль = 1

    if (isFeb2020) {
      total += order.amount;
    }
  }

  return total;
}

// Работа с DOM
const button = document.getElementById("calcBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

button.addEventListener("click", () => {
  const total = calculateFebruary2020Total(orders);
  resultDiv.textContent = `Результат: ${total} руб.`;
});