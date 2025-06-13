const userForm = document.getElementById("userDataForm") as HTMLFormElement;
const resultDisplay = document.getElementById("typeInfoOutput") as HTMLPreElement;

userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Получаем данные из формы
    const userName = (document.getElementById("userNameInput") as HTMLInputElement).value;
    const userAge = parseInt((document.getElementById("userAgeInput") as HTMLInputElement).value);

    // Демонстрация различных типов данных
    const isRegisteredUser = true; // Логический тип (boolean)
    const emptyValue = null; // Значение null
    let undefinedVariable: any; // Неопределённое значение

    let typeInformation = "";

    // Формируем информацию о типах
    typeInformation += "Анализ типов данных в JavaScript:\n\n";
    typeInformation += "Базовые типы:\n";
    typeInformation += `Имя пользователя (userName): ${typeof userName} // Строковый тип\n`;
    typeInformation += `Возраст (userAge): ${typeof userAge} // Числовой тип\n`;
    typeInformation += `Статус регистрации (isRegisteredUser): ${typeof isRegisteredUser} // Логический тип\n`;
    typeInformation += `Пустое значение (emptyValue): ${typeof emptyValue} // Особый тип 'object' (историческая особенность JS)\n`;
    typeInformation += `Неопределённое значение (undefinedVariable): ${typeof undefinedVariable} // Тип 'undefined'\n`;

    // Добавляем информацию о числовых пределах
    typeInformation += "\nЧисловые характеристики JavaScript:\n";
    typeInformation += `Максимально возможное число: ${1.7976931348623157e+308}\n`;
    typeInformation += `Минимальное положительное число (близкое к нулю): ${5e-324}\n`;
    typeInformation += `Максимальное безопасное целое число: ${9007199254740991}\n`;
    typeInformation += `Минимальное безопасное целое число: ${-9007199254740991}\n`;

    // Выводим результат
    resultDisplay.textContent = typeInformation;
});