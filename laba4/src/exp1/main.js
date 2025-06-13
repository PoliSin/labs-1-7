"use strict";
function countOccurrences(sub, text) {
    let count = 0;
    let index = text.indexOf(sub);
    while (index !== -1) {
        count++;
        index = text.indexOf(sub, index + 1);
    }
    return count;
}
window.onload = () => {
    const needleInput = document.getElementById('needle');
    const haystackInput = document.getElementById('haystack');
    const resultDiv = document.getElementById('result');
    const button = document.getElementById('countBtn');
    button.onclick = () => {
        const needle = needleInput.value.trim();
        const haystacks = haystackInput.value.trim().split(/\s+/);
        let total = 0;
        for (let line of haystacks) {
            total += countOccurrences(needle, line);
        }
        resultDiv.textContent = `Количество вхождений: ${total}`;
    };
};
