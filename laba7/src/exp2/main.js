var orders = [
    { id: 1, date: "2020-02-01", amount: 1200 },
    { id: 2, date: "2020-02-15", amount: 850 },
    { id: 3, date: "2020-03-10", amount: 500 },
    { id: 4, date: "2020-02-20", amount: 400 },
    { id: 5, date: "2019-02-10", amount: 300 }
];
function calculateFebruary2020Total(orders) {
    var total = 0;
    for (var _i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
        var order = orders_1[_i];
        var date = new Date(order.date);
        var isFeb2020 = date.getFullYear() === 2020 && date.getMonth() === 1; // январь = 0, февраль = 1
        if (isFeb2020) {
            total += order.amount;
        }
    }
    return total;
}
// Работа с DOM
var button = document.getElementById("calcBtn");
var resultDiv = document.getElementById("result");
button.addEventListener("click", function () {
    var total = calculateFebruary2020Total(orders);
    resultDiv.textContent = "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(total, " \u0440\u0443\u0431.");
});
