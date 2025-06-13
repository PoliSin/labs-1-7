"use strict";
class Восьмиугольник {
    constructor(радиус = 0) {
        this.радиус = радиус;
    }
    установитьРадиус(значение) {
        this.радиус = значение;
    }
    получитьРадиус() {
        return this.радиус;
    }
    площадь() {
        return 2 * (1 + Math.SQRT2) * Math.pow(this.радиус, 2);
    }
    периметр() {
        const сторона = this.радиус * Math.SQRT2;
        return 8 * сторона;
    }
}
window.onload = () => {
    const ввод = document.getElementById("radius");
    const кнопка = document.getElementById("calculateBtn");
    const вывод = document.getElementById("output");
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
