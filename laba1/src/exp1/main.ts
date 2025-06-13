/**
 * Показывает приветствие через всплывающее окно prompt
 */
function showGreetingViaPrompt(): void {
    const userName: string | null = prompt("Как вас зовут?");
    
    if (userName) {
        alert(`Привет, ${userName}!`);
    } else {
        alert("Вы не ввели имя!");
    }
}

/**
 * Показывает приветствие на странице, используя введенное имя из input
 */
function showGreetingOnPage(): void {
    const nameInput = document.getElementById("userNameInput") as HTMLInputElement;
    const greetingOutput = document.getElementById("greetingOutput");

    if (!nameInput || !greetingOutput) {
        console.error("Не найдены необходимые элементы DOM");
        return;
    }

    const userName: string = nameInput.value.trim();
    
    if (userName) {
        greetingOutput.textContent = `Привет, ${userName}!`;
        greetingOutput.style.color = "green";
    } else {
        greetingOutput.textContent = "Пожалуйста, введите ваше имя!";
        greetingOutput.style.color = "red";
    }
}

// Назначаем обработчики событий после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("showPromptButton")?.addEventListener("click", showGreetingViaPrompt);
    document.getElementById("showGreetingButton")?.addEventListener("click", showGreetingOnPage);
});