"use strict";
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomColor() {
    const r = getRandomInt(0, 256);
    const g = getRandomInt(0, 256);
    const b = getRandomInt(0, 256);
    return `rgb(${r},${g},${b})`;
}
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        for (let i = 0; i < 100; i++) {
            const x = getRandomInt(0, canvas.width);
            const y = getRandomInt(0, canvas.height);
            const width = getRandomInt(20, 100);
            const height = getRandomInt(20, 100);
            ctx.fillStyle = getRandomColor();
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, width, height);
        }
    }
};
