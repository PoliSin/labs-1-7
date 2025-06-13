"use strict";
// Получаем доступ к канвасу
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (ctx) {
    // Функция для генерации случайного цвета
    function randomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.5)`; // полупрозрачный
    }
    // Функция для рисования случайной линии
    function drawRandomLine() {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = randomColor();
        ctx.stroke();
    }
    // Рисуем много линий
    for (let i = 0; i < 1000; i++) {
        drawRandomLine();
    }
}
