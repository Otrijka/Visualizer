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

//Листенер нажатия на кнопку поиска кластеров
let findBtn = document.querySelector('.findClusters');
findBtn.addEventListener('click', function () {
    if (points.length == 0) {
        alert("Поле пустое!");
    }
    else {
        centroidsCounter = document.querySelector('.clusterCounter').value;
        if (centroidsCounter < 1) {
            centroidsCounter = 1;
            document.querySelector('.clusterCounter').value = 1
        };
        if (centroidsCounter > 9) {
            centroidsCounter = 9;
            document.querySelector('.clusterCounter').value = 9
        };
        
        kMean();
        drawClusters(centroidsCounter);

        for (let i = 0; i < centroidsCounter; i++) {
            let x = centroids[i].x;
            let y = centroids[i].y;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = 'yellow';
            ctx.fill();
        }
    }
})

//Очистка поля
let clearButton = document.querySelector('.clearMap');
clearButton.addEventListener('click', function () {
    var canvas = document.querySelector('.myCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector('.clusterCounter').value = '';
    centroidsCounter = undefined;
    points = [];
    centroids = [];
    answer = [];
})

//Переход на другой алгоритм
let Astar = document.querySelector('.A-star');
Astar.addEventListener('click', function () {
    Astar.classList.add('clicked');
    setTimeout(function () {
        window.location.href = 'http://127.0.0.1:5500/Astar/astar.html';
    }, 500);
})
