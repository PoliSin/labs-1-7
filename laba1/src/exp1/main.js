"use strict";
/**
 * Показывает приветствие через всплывающее окно prompt
 */
function showGreetingViaPrompt() {
    const userName = prompt("Как вас зовут?");
    if (userName) {
        alert(`Привет, ${userName}!`);
    }
    else {
        alert("Вы не ввели имя!");
    }
}
/**
 * Показывает приветствие на странице, используя введенное имя из input
 */
function showGreetingOnPage() {
    const nameInput = document.getElementById("userNameInput");
    const greetingOutput = document.getElementById("greetingOutput");
    if (!nameInput || !greetingOutput) {
        console.error("Не найдены необходимые элементы DOM");
        return;
    }
    const userName = nameInput.value.trim();
    if (userName) {
        greetingOutput.textContent = `Привет, ${userName}!`;
        greetingOutput.style.color = "green";
    }
    else {
        greetingOutput.textContent = "Пожалуйста, введите ваше имя!";
        greetingOutput.style.color = "red";
    }
}
// Назначаем обработчики событий после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    (_a = document.getElementById("showPromptButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", showGreetingViaPrompt);
    (_b = document.getElementById("showGreetingButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", showGreetingOnPage);
});
