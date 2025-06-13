var inputElement = document.getElementById("arrayInput");
var resultDiv = document.getElementById("result");
var button = document.getElementById("processBtn");
button.addEventListener("click", function () {
    var rawInput = inputElement.value.trim();
    if (!rawInput) {
        resultDiv.textContent = "Пожалуйста, введите числа через запятую.";
        return;
    }
    // Проверка: только цифры, запятые и пробелы допустимы
    var validPattern = /^[0-9,\s]+$/;
    if (!validPattern.test(rawInput)) {
        resultDiv.textContent = "Ошибка: ввод должен содержать только числа, запятые и пробелы.";
        return;
    }
    // Преобразуем ввод в массив чисел
    var inputArray = rawInput
        .split(",")
        .map(function (item) { return parseInt(item.trim(), 10); })
        .filter(function (n) { return !isNaN(n); });
    if (inputArray.length === 0) {
        resultDiv.textContent = "Ошибка: введите хотя бы одно корректное число.";
        return;
    }
    // Удаление дубликатов
    var uniqueArray = Array.from(new Set(inputArray));
    resultDiv.textContent = "\u0411\u0435\u0437 \u0434\u0443\u0431\u043B\u0438\u043A\u0430\u0442\u043E\u0432: ".concat(uniqueArray.join(", "));
});
