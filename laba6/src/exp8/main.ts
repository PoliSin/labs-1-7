const inputEl = document.getElementById('input') as HTMLTextAreaElement;
const button = document.getElementById('process') as HTMLButtonElement;
const output = document.getElementById('output') as HTMLDivElement;

button.addEventListener('click', () => {
  const lines = inputEl.value.trim().split('\n');
  if (lines.length === 0) return;

  let index = 0;
  const studentCount = parseInt(lines[index++]);
  const students: Set<string>[] = [];

  for (let i = 0; i < studentCount; i++) {
    const langCount = parseInt(lines[index++]);
    const langs = new Set<string>();

    for (let j = 0; j < langCount; j++) {
      langs.add(lines[index++]);
    }

    students.push(langs);
  }

  // Языки, которые знают все
  const commonArr: string[] = [];
  const firstStudent = students[0];

  firstStudent.forEach(function(lang) {
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
  const allLangs = new Set<string>();
  for (let i = 0; i < students.length; i++) {
    students[i].forEach(function(lang) {
      allLangs.add(lang);
    });
  }

  // Преобразуем Set в массив
  const allArr: string[] = [];
  allLangs.forEach(function(lang) {
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

