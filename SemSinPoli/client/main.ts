// === СОСТОЯНИЕ ПРИЛОЖЕНИЯ ===
const plannerData: any = JSON.parse(localStorage.getItem('plannerData')) || {};

const currentState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1, // 1-12
  week: 1,
};

const sourceState = {
  year: currentState.year,
  month: currentState.month,
  week: currentState.week,
};

const DAYS_IN_GRID = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'NOTES'];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEAR_OPTIONS = ["2025", "2026", "2027", "2028", "2029", "2030"];
const WEEK_OPTIONS = ["1", "2", "3", "4", "5"];

// Функция для сохранения всех данных в localStorage
function saveAllData() {
  localStorage.setItem('plannerData', JSON.stringify(plannerData));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.grid textarea').forEach((area, index) => {
    (area as HTMLTextAreaElement).addEventListener('input', () => {
      saveWeekData(currentState.year, currentState.month, currentState.week);
      saveAllData(); // Автосохранение при изменении
    });
  });

  document.getElementById('year-btn')!.addEventListener('click', selectCurrentYear);
  document.getElementById('month-btn')!.addEventListener('click', selectCurrentMonth);
  document.getElementById('week-btn')!.addEventListener('click', selectCurrentWeek);

  initializeSettingsModal();
  loadWeekData(currentState.year, currentState.month, currentState.week);
});

function getOrCreateWeekData(year: number, month: number, week: number) {
  plannerData[year] = plannerData[year] || {};
  plannerData[year][month] = plannerData[year][month] || {};
  plannerData[year][month][week] = plannerData[year][month][week] || {};
  return plannerData[year][month][week];
}

function saveWeekData(year: number, month: number, week: number) {
  const weekData = getOrCreateWeekData(year, month, week);
  const textareas = document.querySelectorAll('.grid textarea');
  textareas.forEach((area, index) => {
    const textarea = area as HTMLTextAreaElement;
    const dayKey = DAYS_IN_GRID[index];
    if (dayKey) {
      weekData[dayKey] = textarea.value;
    }
  });
  console.log(`Data saved for ${year}-${month}-${week}:`, weekData);
}

function loadWeekData(year: number, month: number, week: number) {
  const weekData = getOrCreateWeekData(year, month, week);
  const textareas = document.querySelectorAll('.grid textarea');
  textareas.forEach((area, index) => {
    const textarea = area as HTMLTextAreaElement;
    const dayKey = DAYS_IN_GRID[index];
    textarea.value = weekData[dayKey] || '';
  });
  console.log(`Data loaded for ${year}-${month}-${week}`);
}

function selectCurrentYear() {
  showSelectionModal("Select Year", YEAR_OPTIONS, currentState.year.toString(), (selected) => {
    saveWeekData(currentState.year, currentState.month, currentState.week);
    currentState.year = parseInt(selected);
    loadWeekData(currentState.year, currentState.month, currentState.week);
    saveAllData(); // Сохранение при изменении года
  });
}

function selectCurrentMonth() {
  const currentMonthName = MONTH_NAMES[currentState.month - 1];
  showSelectionModal("Select Month", MONTH_NAMES, currentMonthName, (selected) => {
    const newMonthIndex = MONTH_NAMES.indexOf(selected);
    if (newMonthIndex !== -1) {
      saveWeekData(currentState.year, currentState.month, currentState.week);
      currentState.month = newMonthIndex + 1;
      loadWeekData(currentState.year, currentState.month, currentState.week);
      saveAllData(); // Сохранение при изменении месяца
    }
  });
}

function selectCurrentWeek() {
  showSelectionModal("Select Week", WEEK_OPTIONS, currentState.week.toString(), (selected) => {
    saveWeekData(currentState.year, currentState.month, currentState.week);
    currentState.week = parseInt(selected);
    loadWeekData(currentState.year, currentState.month, currentState.week);
    saveAllData(); // Сохранение при изменении недели
  });
}

function initializeSettingsModal() {
  const settingsModal = document.getElementById('settings-modal-overlay')!;
  const okButton = document.getElementById('settings-ok')!;
  const cancelButton = document.getElementById('settings-cancel')!;
  const settingsBtn = document.getElementById('settings-btn')!;

  settingsBtn.addEventListener('click', () => {
    sourceState.year = currentState.year;
    sourceState.month = currentState.month;
    sourceState.week = currentState.week;
    updateSettingsDisplay();
    settingsModal.style.display = 'flex';
  });

  cancelButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  okButton.addEventListener('click', () => {
    const fromData = plannerData[sourceState.year]?.[sourceState.month]?.[sourceState.week];

    if (!fromData || Object.keys(fromData).length === 0) {
      alert(`No data found to copy from ${sourceState.year} / ${MONTH_NAMES[sourceState.month-1]} / Week ${sourceState.week}`);
      return;
    }

    const toData = getOrCreateWeekData(currentState.year, currentState.month, currentState.week);
    for (const day of DAYS_IN_GRID) {
      toData[day] = fromData[day] || '';
    }

    loadWeekData(currentState.year, currentState.month, currentState.week);
    settingsModal.style.display = 'none';
    saveAllData(); // Сохранение после копирования данных
    alert('Data copied successfully!');
  });

  document.getElementById('settings-year')!.addEventListener('click', () => {
    showSelectionModal("Select Source Year", YEAR_OPTIONS, sourceState.year.toString(), (selected) => {
      sourceState.year = parseInt(selected);
      updateSettingsDisplay();
    });
  });

  document.getElementById('settings-month')!.addEventListener('click', () => {
    showSelectionModal("Select Source Month", MONTH_NAMES, MONTH_NAMES[sourceState.month - 1], (selected) => {
      sourceState.month = MONTH_NAMES.indexOf(selected) + 1;
      updateSettingsDisplay();
    });
  });

  document.getElementById('settings-week')!.addEventListener('click', () => {
    showSelectionModal("Select Source Week", WEEK_OPTIONS, sourceState.week.toString(), (selected) => {
      sourceState.week = parseInt(selected);
      updateSettingsDisplay();
    });
  });
}

function updateSettingsDisplay() {
  document.getElementById('settings-year-val')!.textContent = sourceState.year.toString();
  document.getElementById('settings-month-val')!.textContent = MONTH_NAMES[sourceState.month - 1];
  document.getElementById('settings-week-val')!.textContent = sourceState.week.toString();
}

function showSelectionModal(title: string, options: string[], currentValue: string, callback: (val: string) => void) {
  const overlay = document.getElementById("modal-overlay")!;
  const modalTitle = document.getElementById("modal-title")!;
  const form = document.getElementById("modal-form")!;
  const okButton = document.getElementById("modal-ok")!;
  const cancelButton = document.getElementById("modal-cancel")!;

  modalTitle.textContent = title;
  form.innerHTML = '';

  options.forEach(opt => {
    const id = `opt-${opt.replace(/\s+/g, '-')}`;
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

  const okHandler = () => {
    const selectedInput = form.querySelector("input[name='choice']:checked") as HTMLInputElement | null;
    const selected = selectedInput?.value;
    if (selected) callback(selected);
    cleanup();
  };

  const cancelHandler = () => {
    cleanup();
  };

  const cleanup = () => {
    overlay.style.display = "none";
    okButton.removeEventListener('click', okHandler);
    cancelButton.removeEventListener('click', cancelHandler);
  };

  okButton.addEventListener('click', okHandler);
  cancelButton.addEventListener('click', cancelHandler);
}
