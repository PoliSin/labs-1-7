function buildLatinToEnglishDict(lines) {
    var n = parseInt(lines[0]);
    var latToEng = new Map();
    for (var i = 1; i <= n; i++) {
        var line = lines[i];
        var _a = line.split(" - "), english = _a[0], latinListStr = _a[1];
        var latinWords = latinListStr.split(", ").sort();
        for (var _i = 0, latinWords_1 = latinWords; _i < latinWords_1.length; _i++) {
            var latin = latinWords_1[_i];
            if (!latToEng.has(latin)) {
                latToEng.set(latin, []);
            }
            latToEng.get(latin).push(english);
        }
    }
    for (var _b = 0, _c = Array.from(latToEng.entries()); _b < _c.length; _b++) {
        var entry = _c[_b];
        var latin = entry[0];
        var engList = entry[1];
        latToEng.set(latin, engList.sort());
    }
    return latToEng;
}
function formatLatinDict(dict) {
    var sortedLatinWords = Array.from(dict.keys()).sort();
    var lines = [];
    lines.push(sortedLatinWords.length.toString());
    for (var _i = 0, sortedLatinWords_1 = sortedLatinWords; _i < sortedLatinWords_1.length; _i++) {
        var latin = sortedLatinWords_1[_i];
        lines.push("".concat(latin, " - ").concat(dict.get(latin).join(", ")));
    }
    return lines.join("\n");
}
// Обработчик кнопки
document.getElementById("btnConvert").addEventListener("click", function () {
    var inputText = document.getElementById("input").value.trim();
    var outputElem = document.getElementById("output");
    if (!inputText) {
        outputElem.textContent = "Введите данные словаря!";
        return;
    }
    var lines = inputText.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(function (line) { return line.length > 0; });
    if (isNaN(parseInt(lines[0]))) {
        outputElem.textContent = "Первая строка должна содержать число - количество английских слов.";
        return;
    }
    if (lines.length < parseInt(lines[0]) + 1) {
        outputElem.textContent = "Введено меньше строк, чем указано в числе.";
        return;
    }
    try {
        var latinDict = buildLatinToEnglishDict(lines);
        outputElem.textContent = formatLatinDict(latinDict);
    }
    catch (_a) {
        outputElem.textContent = "Ошибка при обработке данных. Проверьте формат ввода.";
    }
});
