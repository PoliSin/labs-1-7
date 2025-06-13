// Получаем элементы со страницы
var inputElement = document.getElementById('input');
var outputElement = document.getElementById('output');
var button = document.getElementById('process');
button.addEventListener('click', function () {
    var rawInput = inputElement.value.trim();
    var lines = rawInput.split('\n');
    var buyers = new Map();
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var parts = line.trim().split(' ');
        if (parts.length !== 3)
            continue;
        var buyer = parts[0], product = parts[1], countStr = parts[2];
        var count = parseInt(countStr);
        if (!buyers.has(buyer)) {
            buyers.set(buyer, new Map());
        }
        var products = buyers.get(buyer);
        if (products.has(product)) {
            products.set(product, products.get(product) + count);
        }
        else {
            products.set(product, count);
        }
    }
    // Формируем результат
    var sortedBuyers = Array.from(buyers.keys()).sort();
    var result = '';
    for (var _a = 0, sortedBuyers_1 = sortedBuyers; _a < sortedBuyers_1.length; _a++) {
        var buyer = sortedBuyers_1[_a];
        result += "".concat(buyer, ":\n");
        var products = buyers.get(buyer);
        var sortedProducts = Array.from(products.keys()).sort();
        for (var _b = 0, sortedProducts_1 = sortedProducts; _b < sortedProducts_1.length; _b++) {
            var product = sortedProducts_1[_b];
            result += "".concat(product, " ").concat(products.get(product), "\n");
        }
    }
    outputElement.textContent = result;
});
