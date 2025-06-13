"use strict";
class BankAccount {
    constructor(accountNumber, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.showMessage(`Вы положили ${amount} ₽. Текущий баланс: ${this.balance} ₽`, 'green');
        }
        else {
            this.showMessage("Сумма депозита должна быть больше 0", 'red');
        }
    }
    withdraw(amount) {
        if (amount > 0) {
            if (amount <= this.balance) {
                this.balance -= amount;
                this.showMessage(`Вы сняли ${amount} ₽. Текущий баланс: ${this.balance} ₽`, 'green');
            }
            else {
                this.showMessage("Недостаточно средств на счете", 'red');
            }
        }
        else {
            this.showMessage("Сумма снятия должна быть больше 0", 'red');
        }
    }
    getBalance() {
        return this.balance;
    }
    showMessage(message, color) {
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.style.color = color;
        }
    }
}
// --- Логика взаимодействия с DOM ---
window.onload = () => {
    let bankAccount = null;
    const accountInput = document.getElementById('accountNumber');
    const amountInput = document.getElementById('amount');
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const balanceSpan = document.getElementById('balance');
    function updateBalance() {
        if (bankAccount) {
            balanceSpan.textContent = bankAccount.getBalance().toFixed(2);
        }
    }
    function createAccountIfNeeded() {
        if (!bankAccount && accountInput.value.trim() !== '') {
            bankAccount = new BankAccount(accountInput.value.trim());
            updateBalance();
        }
    }
    depositBtn.addEventListener('click', () => {
        createAccountIfNeeded();
        if (!bankAccount) {
            alert('Введите номер счета');
            return;
        }
        const amount = parseFloat(amountInput.value);
        bankAccount.deposit(amount);
        updateBalance();
    });
    withdrawBtn.addEventListener('click', () => {
        createAccountIfNeeded();
        if (!bankAccount) {
            alert('Введите номер счета');
            return;
        }
        const amount = parseFloat(amountInput.value);
        bankAccount.withdraw(amount);
        updateBalance();
    });
};
