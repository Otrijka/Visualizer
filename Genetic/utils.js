// Отрисовка пути
function drowPath(path, color = 'green') {

    clear();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(cities[path[0]].x, cities[path[0]].y);
    for (let i = 0; i < path.length; i++) {
        ctx.lineTo(cities[path[i]].x, cities[path[i]].y);
    }
    ctx.closePath();
    ctx.stroke();

    for (let i = 0; i < cities.length; i++) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(cities[i].x, cities[i].y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = "bold 16px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, cities[i].x, cities[i].y);
    }
}

//Промежуточная очистка поля
function clear() {
    ctx.fillStyle = "rgb(192, 214, 236)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cities.length; i++) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(cities[i].x, cities[i].y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = "bold 16px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, cities[i].x, cities[i].y);
    }

}



//Расстояние между двумя точками
function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}

//Нахождение длины одного пути
function wayLength(way) {
    let length = 0;
    for (let i = 0; i < way.length - 1; i++) {
        length += adjacencyMatrix[way[i]][way[i + 1]];
    }
    length += adjacencyMatrix[way[way.length - 1]][way[0]];
    return length;
}

//Получение рандомного числа
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Заполение матрицы смежности 
function fillADJmatrix() {
    for (let i = 0; i < cities.length; i++) {
        adjacencyMatrix[i] = [];
    }
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++) {
            adjacencyMatrix[i][j] = dist(cities[i], cities[j]);
        }
    }
}

//Перемешивание массива
function shuffleArray(array) {
    let index = array.length;
    let temporary, randomIndex;
    while (index !== 0) {
        randomIndex = getRandomInRange(0, index - 1);
        index --;
        temporary = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temporary;
    }
    return array;
}
