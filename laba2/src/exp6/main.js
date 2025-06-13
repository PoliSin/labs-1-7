"use strict";
const canvas = document.getElementById('pyramidCanvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('heightInput');
const button = document.getElementById('drawBtn');
button.addEventListener('click', () => {
    const height = parseInt(input.value);
    if (isNaN(height) || height < 1 || height > 23) {
        alert("Введите число от 1 до 23");
        return;
    }
    drawPyramid(height);
});
function drawPyramid(height) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const blockSize = 10;
    const gap = 2;
    const totalWidth = (height * blockSize) * 2 + gap;
    const startX = (canvas.width - totalWidth) / 2;
    const startY = 20;
    ctx.fillStyle = "red";
    for (let row = 0; row < height; row++) {
        const blocks = row + 1;
        // Левая пирамида
        for (let col = 0; col < blocks; col++) {
            const x = startX + (blockSize * (height - blocks + col));
            const y = startY + row * blockSize;
            ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
        }
        // Правая пирамида
        for (let col = 0; col < blocks; col++) {
            const x = startX + (blockSize * height) + gap + (blockSize * col);
            const y = startY + row * blockSize;
            ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
        }
    }
}
