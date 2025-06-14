"use strict";
const inputEl = document.getElementById('input');
const button = document.getElementById('process');
const output = document.getElementById('output');
button.addEventListener('click', () => {
    const lines = inputEl.value.trim().split('\n');
    if (lines.length === 0)
        return;
    let index = 0;
    const studentCount = parseInt(lines[index++]);
    const students = [];
    for (let i = 0; i < studentCount; i++) {
        const langCount = parseInt(lines[index++]);
        const langs = new Set();
        for (let j = 0; j < langCount; j++) {
            langs.add(lines[index++]);
        }
        students.push(langs);
    }
    // Языки, которые знают все
    const commonArr = [];
    const firstStudent = students[0];
    firstStudent.forEach(function (lang) {
        let knownByAll = true;
        for (let i = 1; i < students.length; i++) {
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
    const allLangs = new Set();
    for (let i = 0; i < students.length; i++) {
        students[i].forEach(function (lang) {
            allLangs.add(lang);
        });
    }
    // Преобразуем Set в массив
    const allArr = [];
    allLangs.forEach(function (lang) {
        allArr.push(lang);
    });
    // Сортировка
    commonArr.sort();
    allArr.sort();
    // Формируем вывод
    let result = '';
    result += `${commonArr.length}\n`;
    result += commonArr.join('\n') + '\n';
    result += `${allArr.length}\n`;
    result += allArr.join('\n');
    output.textContent = result;
});
