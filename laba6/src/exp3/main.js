function calculate() {
    var inputElement = document.getElementById("input");
    var input = inputElement.value.trim();
    // Проверка: допустимы только цифры, запятые и пробелы
    var validInputPattern = /^(\d+\s*,\s*)*\d+\s*$/;
    if (!validInputPattern.test(input)) {
        alert("Ошибка ввода: используйте только целые числа, разделённые запятыми. Пример: 1,2,3");
        return;
    }
    // Преобразуем строку в массив чисел
    var heights = input.split(",").map(function (s) { return Number(s.trim()); });
    var maxArea = 0;
    var left = 0;
    var right = heights.length - 1;
    var bestLeft = 0;
    var bestRight = 0;
    while (left < right) {
        var height = Math.min(heights[left], heights[right]);
        var width = right - left;
        var area = height * width;
        if (area > maxArea) {
            maxArea = area;
            bestLeft = left;
            bestRight = right;
        }
        if (heights[left] < heights[right]) {
            left++;
        }
        else {
            right--;
        }
    }
    document.getElementById("result").textContent = maxArea.toString();
    drawChart(heights, bestLeft, bestRight);
}
function drawChart(heights, leftIndex, rightIndex) {
    var canvas = document.getElementById("chart");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    var barWidth = width / heights.length;
    for (var i = 0; i < heights.length; i++) {
        var barHeight = heights[i] * 10;
        ctx.fillStyle = (i === leftIndex || i === rightIndex) ? "blue" : "gray";
        ctx.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
    }
    var minHeight = Math.min(heights[leftIndex], heights[rightIndex]) * 10;
    var startX = leftIndex * barWidth;
    var waterWidth = (rightIndex - leftIndex) * barWidth;
    ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
    ctx.fillRect(startX, height - minHeight, waterWidth, minHeight);
}
