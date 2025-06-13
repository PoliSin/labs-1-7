var inputEl = document.getElementById('input');
var button = document.getElementById('process');
var output = document.getElementById('output');
button.addEventListener('click', function () {
    var lines = inputEl.value.trim().split('\n');
    if (lines.length === 0)
        return;
    var index = 0;
    var studentCount = parseInt(lines[index++]);
    var students = [];
    for (var i = 0; i < studentCount; i++) {
        var langCount = parseInt(lines[index++]);
        var langs = new Set();
        for (var j = 0; j < langCount; j++) {
            langs.add(lines[index++]);
        }
        students.push(langs);
    }
    // Языки, которые знают все
    var commonArr = [];
    var firstStudent = students[0];
    firstStudent.forEach(function (lang) {
        var knownByAll = true;
        for (var i = 1; i < students.length; i++) {
            if (!students[i].has(lang)) {
                knownByAll = false;
                break;
            }
        }
        if (knownByAll) {
            commonArr.push(lang);
        }
    });
    // Языки, которые знает хотя бы один
    var allLangs = new Set();
    for (var i = 0; i < students.length; i++) {
        students[i].forEach(function (lang) {
            allLangs.add(lang);
        });
    }
    // Преобразуем Set в массив
    var allArr = [];
    allLangs.forEach(function (lang) {
        allArr.push(lang);
    });
    // Сортировка
    commonArr.sort();
    allArr.sort();
    // Формируем вывод
    var result = '';
    result += "".concat(commonArr.length, "\n");
    result += commonArr.join('\n') + '\n';
    result += "".concat(allArr.length, "\n");
    result += allArr.join('\n');
    output.textContent = result;
});
