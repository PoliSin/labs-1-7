var plannerData = JSON.parse(localStorage.getItem('plannerData')) || {};
var currentState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // 1-12
    week: 1,
};
var sourceState = {
    year: currentState.year,
    month: currentState.month,
    week: currentState.week,
};
var DAYS_IN_GRID = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'NOTES'];
var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var YEAR_OPTIONS = ["2025", "2026", "2027", "2028", "2029", "2030"];
var WEEK_OPTIONS = ["1", "2", "3", "4", "5"];
// Функция для сохранения всех данных в localStorage
function saveAllData() {
    localStorage.setItem('plannerData', JSON.stringify(plannerData));
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.grid textarea').forEach(function (area, index) {
        area.addEventListener('input', function () {
            saveWeekData(currentState.year, currentState.month, currentState.week);
            saveAllData(); // Автосохранение при изменении
        });
    });
    document.getElementById('year-btn').addEventListener('click', selectCurrentYear);
    document.getElementById('month-btn').addEventListener('click', selectCurrentMonth);
    document.getElementById('week-btn').addEventListener('click', selectCurrentWeek);
    initializeSettingsModal();
    loadWeekData(currentState.year, currentState.month, currentState.week);
});
function getOrCreateWeekData(year, month, week) {
    plannerData[year] = plannerData[year] || {};
    plannerData[year][month] = plannerData[year][month] || {};
    plannerData[year][month][week] = plannerData[year][month][week] || {};
    return plannerData[year][month][week];
}
function saveWeekData(year, month, week) {
    var weekData = getOrCreateWeekData(year, month, week);
    var textareas = document.querySelectorAll('.grid textarea');
    textareas.forEach(function (area, index) {
        var textarea = area;
        var dayKey = DAYS_IN_GRID[index];
        if (dayKey) {
            weekData[dayKey] = textarea.value;
        }
    });
    console.log("Data saved for ".concat(year, "-").concat(month, "-").concat(week, ":"), weekData);
}
function loadWeekData(year, month, week) {
    var weekData = getOrCreateWeekData(year, month, week);
    var textareas = document.querySelectorAll('.grid textarea');
    textareas.forEach(function (area, index) {
        var textarea = area;
        var dayKey = DAYS_IN_GRID[index];
        textarea.value = weekData[dayKey] || '';
    });
    console.log("Data loaded for ".concat(year, "-").concat(month, "-").concat(week));
}
function selectCurrentYear() {
    showSelectionModal("Select Year", YEAR_OPTIONS, currentState.year.toString(), function (selected) {
        saveWeekData(currentState.year, currentState.month, currentState.week);
        currentState.year = parseInt(selected);
        loadWeekData(currentState.year, currentState.month, currentState.week);
        saveAllData(); // Сохранение при изменении года
    });
}
function selectCurrentMonth() {
    var currentMonthName = MONTH_NAMES[currentState.month - 1];
    showSelectionModal("Select Month", MONTH_NAMES, currentMonthName, function (selected) {
        var newMonthIndex = MONTH_NAMES.indexOf(selected);
        if (newMonthIndex !== -1) {
            saveWeekData(currentState.year, currentState.month, currentState.week);
            currentState.month = newMonthIndex + 1;
            loadWeekData(currentState.year, currentState.month, currentState.week);
            saveAllData(); // Сохранение при изменении месяца
        }
    });
}
function selectCurrentWeek() {
    showSelectionModal("Select Week", WEEK_OPTIONS, currentState.week.toString(), function (selected) {
        saveWeekData(currentState.year, currentState.month, currentState.week);
        currentState.week = parseInt(selected);
        loadWeekData(currentState.year, currentState.month, currentState.week);
        saveAllData(); // Сохранение при изменении недели
    });
}
function initializeSettingsModal() {
    var settingsModal = document.getElementById('settings-modal-overlay');
    var okButton = document.getElementById('settings-ok');
    var cancelButton = document.getElementById('settings-cancel');
    var settingsBtn = document.getElementById('settings-btn');
    settingsBtn.addEventListener('click', function () {
        sourceState.year = currentState.year;
        sourceState.month = currentState.month;
        sourceState.week = currentState.week;
        updateSettingsDisplay();
        settingsModal.style.display = 'flex';
    });
    cancelButton.addEventListener('click', function () {
        settingsModal.style.display = 'none';
    });
    okButton.addEventListener('click', function () {
        var _a, _b;
        var fromData = (_b = (_a = plannerData[sourceState.year]) === null || _a === void 0 ? void 0 : _a[sourceState.month]) === null || _b === void 0 ? void 0 : _b[sourceState.week];
        if (!fromData || Object.keys(fromData).length === 0) {
            alert("No data found to copy from ".concat(sourceState.year, " / ").concat(MONTH_NAMES[sourceState.month - 1], " / Week ").concat(sourceState.week));
            return;
        }
        var toData = getOrCreateWeekData(currentState.year, currentState.month, currentState.week);
        for (var _i = 0, DAYS_IN_GRID_1 = DAYS_IN_GRID; _i < DAYS_IN_GRID_1.length; _i++) {
            var day = DAYS_IN_GRID_1[_i];
            toData[day] = fromData[day] || '';
        }
        loadWeekData(currentState.year, currentState.month, currentState.week);
        settingsModal.style.display = 'none';
        saveAllData(); // Сохранение после копирования данных
        alert('Data copied successfully!');
    });
    document.getElementById('settings-year').addEventListener('click', function () {
        showSelectionModal("Select Source Year", YEAR_OPTIONS, sourceState.year.toString(), function (selected) {
            sourceState.year = parseInt(selected);
            updateSettingsDisplay();
        });
    });
    document.getElementById('settings-month').addEventListener('click', function () {
        showSelectionModal("Select Source Month", MONTH_NAMES, MONTH_NAMES[sourceState.month - 1], function (selected) {
            sourceState.month = MONTH_NAMES.indexOf(selected) + 1;
            updateSettingsDisplay();
        });
    });
    document.getElementById('settings-week').addEventListener('click', function () {
        showSelectionModal("Select Source Week", WEEK_OPTIONS, sourceState.week.toString(), function (selected) {
            sourceState.week = parseInt(selected);
            updateSettingsDisplay();
        });
    });
}
function updateSettingsDisplay() {
    document.getElementById('settings-year-val').textContent = sourceState.year.toString();
    document.getElementById('settings-month-val').textContent = MONTH_NAMES[sourceState.month - 1];
    document.getElementById('settings-week-val').textContent = sourceState.week.toString();
}
function showSelectionModal(title, options, currentValue, callback) {
    var overlay = document.getElementById("modal-overlay");
    var modalTitle = document.getElementById("modal-title");
    var form = document.getElementById("modal-form");
    var okButton = document.getElementById("modal-ok");
    var cancelButton = document.getElementById("modal-cancel");
    modalTitle.textContent = title;
    form.innerHTML = '';
    options.forEach(function (opt) {
        var id = "opt-".concat(opt.replace(/\s+/g, '-'));
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "choice";
        input.value = opt;
        input.id = id;
        if (opt === currentValue)
            input.checked = true;
        var label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = opt;
        var div = document.createElement("div");
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });
    overlay.style.display = "flex";
    var okHandler = function () {
        var selectedInput = form.querySelector("input[name='choice']:checked");
        var selected = selectedInput === null || selectedInput === void 0 ? void 0 : selectedInput.value;
        if (selected)
            callback(selected);
        cleanup();
    };
    var cancelHandler = function () {
        cleanup();
    };
    var cleanup = function () {
        overlay.style.display = "none";
        okButton.removeEventListener('click', okHandler);
        cancelButton.removeEventListener('click', cancelHandler);
    };
    okButton.addEventListener('click', okHandler);
    cancelButton.addEventListener('click', cancelHandler);
}
