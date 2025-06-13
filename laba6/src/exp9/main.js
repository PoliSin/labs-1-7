function isValid(s) {
    var stack = [];
    var pairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    for (var i = 0; i < s.length; i++) {
        var ch = s[i];
        if (ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        }
        else if (ch === ')' || ch === '}' || ch === ']') {
            if (stack.length === 0)
                return false;
            var top_1 = stack.pop();
            if (top_1 !== pairs[ch]) {
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
window.onload = function () {
    var input = document.getElementById('inputString');
    var button = document.getElementById('checkBtn');
    var result = document.getElementById('result');
    button.onclick = function () {
        var text = input.value.trim();
        if (text === '') {
            result.textContent = 'Пожалуйста, введите строку.';
            result.style.color = 'red';
            return;
        }
        var valid = isValid(text);
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
