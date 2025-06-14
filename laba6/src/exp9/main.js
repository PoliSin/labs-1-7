"use strict";
function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        }
        else if (ch === ')' || ch === '}' || ch === ']') {
            if (stack.length === 0)
                return false;
            const top = stack.pop();
            if (top !== pairs[ch]) {
                return false;
            }
        }
        else {
            // Если символ не из скобок — пропускаем или считаем ошибкой, можно изменить логику
            return false;
        }
    }
    return stack.length === 0;
}
window.onload = () => {
    const input = document.getElementById('inputString');
    const button = document.getElementById('checkBtn');
    const result = document.getElementById('result');
    button.onclick = () => {
        const text = input.value.trim();
        if (text === '') {
            result.textContent = 'Пожалуйста, введите строку.';
            result.style.color = 'red';
            return;
        }
        const valid = isValid(text);
        if (valid) {
            result.textContent = 'Строка валидна ✅';
            result.style.color = 'green';
        }
        else {
            result.textContent = 'Строка НЕвалидна ❌';
            result.style.color = 'red';
        }
    };
};
