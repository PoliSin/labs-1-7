// Импорт модулей
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Создаём интерфейс для чтения из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для чтения строки от пользователя
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Функция поиска файлов
async function searchFiles(dirPath: string, keyword: string) {
  const files = fs.readdirSync(dirPath);
  const matchedFiles: string[] = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      const ext = path.extname(file);
      // Проверка имени файла
      if (file.toLowerCase().includes(keyword.toLowerCase())) {
        matchedFiles.push(fullPath);
        continue;
      }
      // Проверка содержимого, если текстовый файл
      if (ext === '.txt' || ext === '.md') {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.toLowerCase().includes(keyword.toLowerCase())) {
          matchedFiles.push(fullPath);
        }
      }
    }
  }

  if (matchedFiles.length === 0) {
    console.log('\nФайлы не найдены.');
  } else {
    console.log('\nНайденные файлы:');
    for (const file of matchedFiles) {
      console.log(file);
    }
  }
}

// Главная функция
async function main() {
  const dir = await askQuestion('Введите путь к папке: ');
  const word = await askQuestion('Введите слово для поиска: ');

  await searchFiles(dir.trim(), word.trim());

  rl.close();
}

main();