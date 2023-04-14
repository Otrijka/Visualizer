function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}
function makeDistances() {
    for (let i = 0; i < cities.length; i++) {
        distances[i] = [];
    }
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++) {
            distances[i][j] = dist(cities[i], cities[j]);
        }
    }
}
function clear() {
    let itterations = 0;
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
