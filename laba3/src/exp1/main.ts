class Student {
  private name: string;
  private age: number;
  private major: string;

  constructor(name?: string, age?: number, major?: string) {
    this.name = name || "Без имени";
    this.age = age || 0;
    this.major = major || "Не указано";
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public getMajor(): string {
    return this.major;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setAge(age: number): void {
    this.age = age;
  }

  public setMajor(major: string): void {
    this.major = major;
  }

  public getInfo(): string {
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