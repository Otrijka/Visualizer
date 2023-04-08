//переменные для логики
let centroidsCounter;
let points = [];
let answer = [];
let adjMatrix = [];


//Канвас
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');

//Листенер нажатия на поле (ставит объект)
canvas.addEventListener('mousedown', function (event) {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    points.push({ y: y, x: x });
});


//Расстояние между двумя точками
function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}

//Матрица смежности
function makeAdjMatrix() {
    for (let i = 0; i < points.length; i++) {
        adjMatrix[i] = [];
        for (let j = 0; j < points.length; j++) {
            adjMatrix[i].push(dist(points[i],points[j]));
        }
    }
}
