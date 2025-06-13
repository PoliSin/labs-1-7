"use strict";
class Student {
    constructor(name, age, major) {
        this.name = name || "Без имени";
        this.age = age || 0;
        this.major = major || "Не указано";
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
    getMajor() {
        return this.major;
    }
    setName(name) {
        this.name = name;
    }
    setAge(age) {
        this.age = age;
    }
    setMajor(major) {
        this.major = major;
    }
    getInfo() {
        return `Имя: ${this.name}, Возраст: ${this.age}, Специальность: ${this.major}`;
    }
}
// Создание объектов
const student1 = new Student();
student1.setName("Максим");
student1.setAge(18);
student1.setMajor("Информатика");
const student2 = new Student("Иван", 19, "Программная инженерия");
const student3 = new Student("Алина", 20, "Кибербезопасность");
// Выводим данные на страницу
const outputDiv = document.getElementById("output");
if (outputDiv) {
    outputDiv.innerHTML = `
    <p>${student1.getInfo()}</p>
    <p>${student2.getInfo()}</p>
    <p>${student3.getInfo()}</p>
  `;
}
