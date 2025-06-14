const API_URL = 'http://localhost:5555/api/tasks';

const currentState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    week: 1,
};

const sourceState = { ...currentState };

const DAYS_IN_GRID = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'NOTES'];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEAR_OPTIONS = ["2025", "2026", "2027", "2028", "2029", "2030"];
const WEEK_OPTIONS = ["1", "2", "3", "4", "5"];

async function fetchTask(year, month, week) {
    const id = `${year}-${month}-${week}`;
    const res = await fetch(`${API_URL}/${id}`);
    if (res.ok) {
        return await res.json();
    } else {
        return { data: getEmptyWeekData() }; // Если нет данных, вернуть пустую неделю
    }
}

async function saveTask(year, month, week, data) {
    const id = `${year}-${month}-${week}`;
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, month, week, data }),
    });
}

function getEmptyWeekData() {
    const obj = {};
    for (const day of DAYS_IN_GRID) {
        obj[day] = '';
    }
    return obj;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.grid textarea').forEach((area) => {
        area.addEventListener('input', () => {
            saveWeekData(currentState.year, currentState.month, currentState.week);
        });
    });

    document.getElementById('year-btn').addEventListener('click', selectCurrentYear);
    document.getElementById('month-btn').addEventListener('click', selectCurrentMonth);
    document.getElementById('week-btn').addEventListener('click', selectCurrentWeek);

    initializeSettingsModal();
    loadWeekData(currentState.year, currentState.month, currentState.week);
});

async function saveWeekData(year, month, week) {
    const data = {};
    document.querySelectorAll('.grid textarea').forEach((area, index) => {
        const dayKey = DAYS_IN_GRID[index];
        data[dayKey] = area.value.trim();
    });

    await saveTask(year, month, week, data);
    console.log(`Saved to backend: ${year}-${month}-${week}`, data);
}

async function loadWeekData(year, month, week) {
    const weekData = await fetchTask(year, month, week);
    document.querySelectorAll('.grid textarea').forEach((area, index) => {
        const dayKey = DAYS_IN_GRID[index];
        area.value = weekData?.data?.[dayKey] || '';
    });
    console.log(`Loaded from backend: ${year}-${month}-${week}`);
}

function selectCurrentYear() {
    showSelectionModal("Select Year", YEAR_OPTIONS, currentState.year.toString(), (selected) => {
        currentState.year = parseInt(selected);
        loadWeekData(currentState.year, currentState.month, currentState.week);
    });
}

function selectCurrentMonth() {
    showSelectionModal("Select Month", MONTH_NAMES, MONTH_NAMES[currentState.month - 1], (selected) => {
        const newMonthIndex = MONTH_NAMES.indexOf(selected);
        if (newMonthIndex !== -1) {
            currentState.month = newMonthIndex + 1;
            loadWeekData(currentState.year, currentState.month, currentState.week);
        }
    });
}

function selectCurrentWeek() {
    showSelectionModal("Select Week", WEEK_OPTIONS, currentState.week.toString(), (selected) => {
        currentState.week = parseInt(selected);
        loadWeekData(currentState.year, currentState.month, currentState.week);
    });
}

function initializeSettingsModal() {
    const modal = document.getElementById('settings-modal-overlay');
    const openBtn = document.getElementById('settings-btn');
    const okBtn = document.getElementById('settings-ok');
    const cancelBtn = document.getElementById('settings-cancel');

    openBtn.addEventListener('click', () => {
        Object.assign(sourceState, currentState);
        updateSettingsDisplay();
        modal.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    okBtn.addEventListener('click', async () => {
        const fromData = await fetchTask(sourceState.year, sourceState.month, sourceState.week);
        if (!fromData || !fromData.data || Object.values(fromData.data).every(val => val.trim() === '')) {
            alert(`No data to copy from ${sourceState.year} / ${MONTH_NAMES[sourceState.month - 1]} / Week ${sourceState.week}`);
            return;
        }

        await saveTask(currentState.year, currentState.month, currentState.week, fromData.data);
        await loadWeekData(currentState.year, currentState.month, currentState.week);
        modal.style.display = 'none';
        alert('Week copied successfully!');
    });

    document.getElementById('settings-year').addEventListener('click', () => {
        showSelectionModal("Select Source Year", YEAR_OPTIONS, sourceState.year.toString(), (selected) => {
            sourceState.year = parseInt(selected);
            updateSettingsDisplay();
        });
    });

    document.getElementById('settings-month').addEventListener('click', () => {
        showSelectionModal("Select Source Month", MONTH_NAMES, MONTH_NAMES[sourceState.month - 1], (selected) => {
            sourceState.month = MONTH_NAMES.indexOf(selected) + 1;
            updateSettingsDisplay();
        });
    });

    document.getElementById('settings-week').addEventListener('click', () => {
        showSelectionModal("Select Source Week", WEEK_OPTIONS, sourceState.week.toString(), (selected) => {
            sourceState.week = parseInt(selected);
            updateSettingsDisplay();
        });
    });
}

function updateSettingsDisplay() {
    document.getElementById('settings-year-val').textContent = sourceState.year;
    document.getElementById('settings-month-val').textContent = MONTH_NAMES[sourceState.month - 1];
    document.getElementById('settings-week-val').textContent = sourceState.week;
}

function showSelectionModal(title, options, currentValue, callback) {
    const overlay = document.getElementById("modal-overlay");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("modal-form");
    const okButton = document.getElementById("modal-ok");
    const cancelButton = document.getElementById("modal-cancel");

    modalTitle.textContent = title;
    form.innerHTML = '';

    options.forEach(opt => {
        const id = `opt-${opt}`;
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "choice";
        input.value = opt;
        input.id = id;
        if (opt === currentValue) input.checked = true;

        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = opt;

        const div = document.createElement("div");
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
    });

    overlay.style.display = "flex";

    const cleanup = () => {
        overlay.style.display = "none";
        okButton.removeEventListener('click', okHandler);
        cancelButton.removeEventListener('click', cleanup);
    };

    const okHandler = () => {
        const selected = form.querySelector("input[name='choice']:checked")?.value;
        if (selected) callback(selected);
        cleanup();
    };

    okButton.addEventListener('click', okHandler);
    cancelButton.addEventListener('click', cleanup);
}
