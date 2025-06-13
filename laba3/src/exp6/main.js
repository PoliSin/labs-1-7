"use strict";
class Engine {
    constructor(power) {
        this.power = power;
    }
    getPower() {
        return this.power;
    }
}
class Passenger {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Car {
    constructor(model, engine) {
        this.passenger1 = null;
        this.passenger2 = null;
        this.model = model;
        this.engine = engine;
    }
    addPassenger(passenger) {
        if (!this.passenger1) {
            this.passenger1 = passenger;
            return `${passenger.getName()} добавлен как пассажир 1.`;
        }
        else if (!this.passenger2) {
            this.passenger2 = passenger;
            return `${passenger.getName()} добавлен как пассажир 2.`;
        }
        else {
            return `Машина уже полная. Нельзя добавить ${passenger.getName()}.`;
        }
    }
    removePassenger(passenger) {
        if (this.passenger1 && this.passenger1.getName() === passenger.getName()) {
            this.passenger1 = null;
            return `${passenger.getName()} удалён с места пассажир 1.`;
        }
        else if (this.passenger2 && this.passenger2.getName() === passenger.getName()) {
            this.passenger2 = null;
            return `${passenger.getName()} удалён с места пассажир 2.`;
        }
        else {
            return `${passenger.getName()} не найден в машине.`;
        }
    }
    displayInfo() {
        let info = `Модель: ${this.model}<br>Мощность двигателя: ${this.engine.getPower()} л.с.<br>`;
        info += `Пассажир 1: ${this.passenger1 ? this.passenger1.getName() : "пусто"}<br>`;
        info += `Пассажир 2: ${this.passenger2 ? this.passenger2.getName() : "пусто"}`;
        return info;
    }
}
// Main (при загрузке страницы)
window.onload = () => {
    const output = document.getElementById("output");
    const input = document.getElementById("passengerName");
    const addBtn = document.getElementById("addBtn");
    const removeBtn = document.getElementById("removeBtn");
    const engine = new Engine(120);
    const car = new Car("Toyota", engine);
    const updateDisplay = () => {
        output.innerHTML = car.displayInfo();
    };
    addBtn.addEventListener("click", () => {
        const name = input.value.trim();
        if (name) {
            const passenger = new Passenger(name);
            alert(car.addPassenger(passenger));
            input.value = "";
            updateDisplay();
        }
    });
    removeBtn.addEventListener("click", () => {
        const name = input.value.trim();
        if (name) {
            const passenger = new Passenger(name);
            alert(car.removePassenger(passenger));
            input.value = "";
            updateDisplay();
        }
    });
    updateDisplay();
};
