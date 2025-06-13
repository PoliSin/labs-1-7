function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function listPrimesUpTo(n: number): string {
  let result = "";
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      result += i + ", ";
    }
  }
  return result.slice(0, -2); // убираем последнее ", "
}

const button = document.getElementById("startBtn") as HTMLButtonElement;
button.addEventListener("click", () => {
  const input = document.getElementById("numberInput") as HTMLInputElement;
  const output = document.getElementById("result") as HTMLParagraphElement;

  const value = parseInt(input.value);
  if (isNaN(value) || value < 2) {
    output.textContent = "Пожалуйста, введите число больше 1.";
    return;
  }

  const primes = listPrimesUpTo(value);
  output.textContent = `Простые числа до ${value}: ${primes}`;
});