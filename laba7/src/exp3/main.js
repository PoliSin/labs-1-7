"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Импорт модулей
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
// Создаём интерфейс для чтения из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Функция для чтения строки от пользователя
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
// Функция поиска файлов
function searchFiles(dirPath, keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = fs.readdirSync(dirPath);
        const matchedFiles = [];
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
        }
        else {
            console.log('\nНайденные файлы:');
            for (const file of matchedFiles) {
                console.log(file);
            }
        }
    });
}
// Главная функция
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dir = yield askQuestion('Введите путь к папке: ');
        const word = yield askQuestion('Введите слово для поиска: ');
        yield searchFiles(dir.trim(), word.trim());
        rl.close();
    });
}
main();
