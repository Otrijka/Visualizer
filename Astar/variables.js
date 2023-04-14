//Переменные для логики
let matrix = [];
let size;
let percent;

let start = {};
let end = {};

let path = [];
let grid;
let pathIsFind;

//Ячейки поля
let cells;

//Кнопки
let makeTableButton; 
let findPathButton;

let setStartButton;
let setEndButton;
let setWallsButton;
let setPathWayButton;

function buttonsInit() {
     makeTableButton = document.querySelector('.makeTableBtn');
     findPathButton = document.querySelector('.findPath');

     setStartButton = document.querySelector('.makeStartBtn');
     setEndButton = document.querySelector('.makeEndBtn');
     setWallsButton = document.querySelector('.makeWallsBtn');
     setPathWayButton = document.querySelector('.makeGrassBtn');
}

//Цвета
let trailColor = 'rgb(192, 214, 236)';
let wallColor = 'gray';
let startColor = 'yellow';
let endColor = 'orange';
let allPathColor = 'rgb(10, 233, 159)';
let findedPathColor = 'blue';
let emptyPathColor = 'darkRed';