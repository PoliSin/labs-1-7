class Восьмиугольник {
  private радиус: number;

  constructor(радиус: number = 0) {
    this.радиус = радиус;
  }

  public установитьРадиус(значение: number): void {
    this.радиус = значение;
  }

  public получитьРадиус(): number {
    return this.радиус;
  }

  public площадь(): number {
    return 2 * (1 + Math.SQRT2) * this.радиус ** 2;
  }

  public периметр(): number {
    const сторона = this.радиус * Math.SQRT2;
    return 8 * сторона;
  }
}

window.onload = () => {
  const ввод = document.getElementById("radius") as HTMLInputElement;
  const кнопка = document.getElementById("calculateBtn") as HTMLButtonElement;
  const вывод = document.getElementById("output") as HTMLDivElement;

  кнопка.onclick = () => {
    const значение = parseFloat(ввод.value);

    if (isNaN(значение) || значение <= 0) {
      вывод.innerHTML = "Пожалуйста, введите положительное число.";
      return;
    }

    const восьмиугольник = new Восьмиугольник(значение);
    const площадь = восьмиугольник.площадь().toFixed(2);
    const периметр = восьмиугольник.периметр().toFixed(2);

    вывод.innerHTML = `
      Радиус: ${значение}<br>
      Площадь: ${площадь}<br>
      Периметр: ${периметр}
    `;
  };
};