
let makeAWays = document.getElementById("bForMWays");

let clearMap = document.getElementById("Clear");

// Очистка поля
clearMap.addEventListener("click", function () {

    ctx.fillStyle = "rgb(192, 214, 236)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cities = [];
    distances = [];
    bestPath = [];
    bestPathLength = Infinity;
});



// Установка города
canv.addEventListener('mousedown', function (e) {
    if (cities.length === 60) {
        alert("Поле переполнено");
        return;
    }


    ctx.fillStyle = 'black';

    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 15, 0, Math.PI * 2);
    let x = e.offsetX;
    let y = e.offsetY;
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = "bold 16px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cities.length, x, y);

    cities.push({ x: x, y: y });
    bestPath = [];
    bestPathLength = Infinity;



});