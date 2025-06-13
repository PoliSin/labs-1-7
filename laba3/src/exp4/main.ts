class BankAccount {
  accountNumber: string;
  private balance: number;

  constructor(accountNumber: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      this.showMessage(`Вы положили ${amount} ₽. Текущий баланс: ${this.balance} ₽`, 'green');
    } else {
      this.showMessage("Сумма депозита должна быть больше 0", 'red');
    }
  }

  withdraw(amount: number): void {
    if (amount > 0) {
      if (amount <= this.balance) {
        this.balance -= amount;
        this.showMessage(`Вы сняли ${amount} ₽. Текущий баланс: ${this.balance} ₽`, 'green');
      } else {
        this.showMessage("Недостаточно средств на счете", 'red');
      }
    } else {
      this.showMessage("Сумма снятия должна быть больше 0", 'red');
    }
  }

  getBalance(): number {
    return this.balance;
  }

  private showMessage(message: string, color: string) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
      messageDiv.textContent = message;
      messageDiv.style.color = color;
    }
  }
}

// --- Логика взаимодействия с DOM ---

window.onload = () => {
  let bankAccount: BankAccount | null = null;

  const accountInput = document.getElementById('accountNumber') as HTMLInputElement;
  const amountInput = document.getElementById('amount') as HTMLInputElement;
  const depositBtn = document.getElementById('depositBtn') as HTMLButtonElement;
  const withdrawBtn = document.getElementById('withdrawBtn') as HTMLButtonElement;
  const balanceSpan = document.getElementById('balance') as HTMLElement;

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