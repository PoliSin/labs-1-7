"use strict";
function perms(nums) {
    const result = [];
    function backtrack(path, options) {
        if (options.length === 0) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < options.length; i++) {
            const newPath = [...path, options[i]];
            const newOptions = options.slice(0, i).concat(options.slice(i + 1));
            backtrack(newPath, newOptions);
        }
    }
    backtrack([], nums);
    return result;
}
function handleGenerate() {
    const input = document.getElementById("inputNumbers").value;
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // Очистка
    const numbers = input.split(',').map(num => parseInt(num.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) {
        resultContainer.textContent = "Пожалуйста, введите корректные числа.";
        return;
    }
    const permutations = perms(numbers);
    permutations.forEach(p => {
        const div = document.createElement("div");
        div.className = "permutation";
        div.textContent = `[${p.join(", ")}]`;
        resultContainer.appendChild(div);
    });
}
// Чтобы HTML мог вызвать
window.handleGenerate = handleGenerate;
