"use strict";
class Author {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }
}
class Book {
    constructor() {
        this.author = null;
    }
    setAuthor(author) {
        this.author = author;
    }
    getAuthorInfo() {
        if (this.author) {
            return `Автор: ${this.author.name}, год рождения: ${this.author.birthYear}`;
        }
        else {
            return "Автор не установлен";
        }
    }
}
window.onload = () => {
    const authorNameInput = document.getElementById('authorName');
    const birthYearInput = document.getElementById('birthYear');
    const setAuthorBtn = document.getElementById('setAuthorBtn');
    const authorInfoPara = document.getElementById('authorInfo');
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
