//Получение рандомного числа из диапазона
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Рандомная выборка стартовых центроид
function makeStartCentriods() {
    let usedIndexis = [];
    while (centroids.length != centroidsCounter) {
        //Эта строчка исправила все проблемы (глубокое копировние)
        const pointsClone = JSON.parse(JSON.stringify(points));
        let index = getRandomInRange(0, pointsClone.length - 1);

        if (usedIndexis.includes(index) == false) {
            centroids.push(pointsClone[index]);
            usedIndexis.push(index);
        }
    }
    return centroids;
}

//Расстояние между двумя точками
function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}

//Отрисовка кластеров
function drawClusters() {
    for (let i = 0; i < centroidsCounter; i++) {
        for (let j = 0; j < answer[i].length; j++) {
            let y = answer[i][j].y;
            let x = answer[i][j].x;
            ctx.beginPath();
            ctx.arc(x, y, 14, 0, 2 * Math.PI);
            ctx.fillStyle = colors[i];
            ctx.fill();
        }
    }
}
