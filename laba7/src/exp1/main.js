function findMostFrequentChar(s) {
    var frequencyMap = {};
    for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
        var char = s_1[_i];
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    var maxChar = '';
    var maxCount = 0;
    for (var char in frequencyMap) {
        if (frequencyMap[char] > maxCount) {
            maxChar = char;
            maxCount = frequencyMap[char];
        }
    }
    return [maxChar, maxCount];
}
// Работаем с HTML
var input = document.getElementById("textInput");
var button = document.getElementById("checkBtn");
var resultDiv = document.getElementById("result");
button.addEventListener("click", function () {
    var inputValue = input.value;
    if (inputValue.trim() === '') {
        resultDiv.textContent = "Введите строку!";
        return;
    }
    var _a = findMostFrequentChar(inputValue), char = _a[0], count = _a[1];
    resultDiv.textContent = "\u0421\u0430\u043C\u044B\u0439 \u0447\u0430\u0441\u0442\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B: \"".concat(char, "\", \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ").concat(count);
});
