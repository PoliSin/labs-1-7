"use strict";
function drawLines() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Контекст канвы не найден!");
        return;
    }
    const centerX = 0;
    const centerY = canvas.height / 2;
    for (let i = 0; i < 1000; i++) {
        const endX = canvas.width;
        const endY = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(0, 0, 255, 0.1)";
        ctx.stroke();
    }
}
window.onload = drawLines;
