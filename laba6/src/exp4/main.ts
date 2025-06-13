type Dictionary = Map<string, string[]>;

function buildLatinToEnglishDict(lines: string[]): Dictionary {
  const n = parseInt(lines[0]);
  const latToEng: Dictionary = new Map();

  for (let i = 1; i <= n; i++) {
    const line = lines[i];
    const [english, latinListStr] = line.split(" - ");
    const latinWords = latinListStr.split(", ").sort();

    for (const latin of latinWords) {
      if (!latToEng.has(latin)) {
        latToEng.set(latin, []);
      }
      latToEng.get(latin)!.push(english);
    }
  }

 for (const entry of Array.from(latToEng.entries())) {
  const latin = entry[0];
  const engList = entry[1];
  latToEng.set(latin, engList.sort());
}



  return latToEng;
}

function formatLatinDict(dict: Dictionary): string {
  const sortedLatinWords = Array.from(dict.keys()).sort();
  const lines: string[] = [];
  lines.push(sortedLatinWords.length.toString());
  for (const latin of sortedLatinWords) {
    lines.push(`${latin} - ${dict.get(latin)!.join(", ")}`);
  }
  return lines.join("\n");
}

// Обработчик кнопки
document.getElementById("btnConvert")!.addEventListener("click", () => {
  const inputText = (document.getElementById("input") as HTMLTextAreaElement).value.trim();
  const outputElem = document.getElementById("output")!;
  
  if (!inputText) {
    outputElem.textContent = "Введите данные словаря!";
    return;
  }

  const lines = inputText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

  if (isNaN(parseInt(lines[0]))) {
    outputElem.textContent = "Первая строка должна содержать число - количество английских слов.";
    return;
  }

  if (lines.length < parseInt(lines[0]) + 1) {
    outputElem.textContent = "Введено меньше строк, чем указано в числе.";
    return;
  }

  try {
    const latinDict = buildLatinToEnglishDict(lines);
    outputElem.textContent = formatLatinDict(latinDict);
  } catch {
    outputElem.textContent = "Ошибка при обработке данных. Проверьте формат ввода.";
  }
});
