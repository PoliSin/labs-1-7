class Author {
  name: string;
  birthYear: number;

  constructor(name: string, birthYear: number) {
    this.name = name;
    this.birthYear = birthYear;
  }
}

class Book {
  private author: Author | null;

  constructor() {
    this.author = null;
  }

  setAuthor(author: Author): void {
    this.author = author;
  }

  getAuthorInfo(): string {
    if (this.author) {
      return `Автор: ${this.author.name}, год рождения: ${this.author.birthYear}`;
    } else {
      return "Автор не установлен";
    }
  }
}

window.onload = () => {
  const authorNameInput = document.getElementById('authorName') as HTMLInputElement;
  const birthYearInput = document.getElementById('birthYear') as HTMLInputElement;
  const setAuthorBtn = document.getElementById('setAuthorBtn') as HTMLButtonElement;
  const authorInfoPara = document.getElementById('authorInfo') as HTMLElement;

  const book = new Book();

  setAuthorBtn.addEventListener('click', () => {
    const name = authorNameInput.value.trim();
    const birthYear = Number(birthYearInput.value);

    if (!name) {
      alert("Пожалуйста, введите имя автора");
      return;
    }
    if (!birthYear || birthYear <= 0) {
      alert("Пожалуйста, введите корректный год рождения");
      return;
    }

    const author = new Author(name, birthYear);
    book.setAuthor(author);

    authorInfoPara.textContent = book.getAuthorInfo();
  });
};