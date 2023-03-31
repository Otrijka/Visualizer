function makeMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PaintTable() {
  const mainPlace = document.querySelector(".mainPlace");

  const table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");
      td.style.backgroundColor = 'darkGray';

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  mainPlace.appendChild(table);
  makeMap();
}

function makeGrass() {
  let cells = document.querySelector('td');
}

function makeMap() {
  let marked = [];
  let count = Number(size * size * percent / 100);
  for (let i = 0; i < count; i++) {
    let x = getRandomInRange(0, size - 1);
    let y = getRandomInRange(0, size - 1);
    let coords = document.querySelectorAll('tr');
    if (marked.includes({ y, x })) {
      i--;
    }
    else {
      matrix[y][x] = "x";
      coords[y].childNodes[x].style.backgroundColor = 'gray';
      marked.push({ y, x });
    }
  }
}

function pointsHere() {
  return start != undefined && end != undefined;
}

function drawPath() {
  let cell = document.querySelectorAll('td');
  let indexArr = [];
  let draw = setInterval(function () {
    if (path.length == 0) {

      clearInterval(draw);
    }
    else {
      let current = path[0];
      let x = current.y;
      let y = current.x;
      let index = Number(y * size + x);
      indexArr.push(index);
      cell[index].style.backgroundColor = 'blue';
      path.shift();
    }
  }, 60)
}

//Начало программы
let matrix = [];
let size;
let percent;

let start = {};
let end = {};

let path = [];
let grid;

let pathIsFind;

document.querySelector('.makeTableBtn').addEventListener('click', function () {
  if (document.querySelector('.mainPlace').childElementCount != 0) document.querySelector('.mainPlace').removeChild(document.querySelector('table'));
  start = undefined;
  end = undefined;
  size = document.querySelector('.inputSize').value;
  if (size < 10) {
    size = 10;
    document.querySelector('.inputSize').value = size;
  }
  if (size > 100) {
    size = 100;
    document.querySelector('.inputSize').value = size;
  }
  grid = new Array(Number(size));
  percent = document.querySelector('.wallPercent').value;
  matrix = makeMatrix(size);
  PaintTable();
})

document.querySelector('.makeWallsBtn').addEventListener('click', function () {
  document.querySelector('.makeStartBtn').style.height = 8 + '%';
  document.querySelector('.makeEndBtn').style.height = 8 + '%';
  document.querySelector('.makeGrassBtn').style.height = 8 + '%';
  document.querySelector('.makeWallsBtn').style.height = 15 + '%';
  let cells = document.querySelectorAll('td');
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == 'yellow') start = undefined;
      if (cells[i].style.backgroundColor == 'orange') end = undefined;
      cells[i].style.backgroundColor = 'gray';
      matrix[y][x] = 'x';
    })
  }
})

document.querySelector('.makeStartBtn').addEventListener('click', function () {
  document.querySelector('.makeWallsBtn').style.height = 8 + '%';
  document.querySelector('.makeEndBtn').style.height = 8 + '%';
  document.querySelector('.makeGrassBtn').style.height = 8 + '%';
  document.querySelector('.makeStartBtn').style.height = 15 + '%';
  let cells = document.querySelectorAll('td');
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == 'orange') end = undefined;
      if (start == undefined) {
        cells[i].style.backgroundColor = 'yellow';
        matrix[y][x] = 'start';
        start = { y: y, x: x };
      }
    })
  }
})

document.querySelector('.makeEndBtn').addEventListener('click', function () {
  document.querySelector('.makeStartBtn').style.height = 8 + '%';
  document.querySelector('.makeWallsBtn').style.height = 8 + '%';
  document.querySelector('.makeGrassBtn').style.height = 8 + '%';
  document.querySelector('.makeEndBtn').style.height = 15 + '%';
  let cells = document.querySelectorAll('td');
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == 'yellow') start = undefined;
      if (end == undefined) {
        cells[i].style.backgroundColor = 'orange';
        matrix[y][x] = 'end';
        end = { y: y, x: x };
      }
    })
  }
})

document.querySelector('.makeGrassBtn').addEventListener('click', function () {
  document.querySelector('.makeStartBtn').style.height = 8 + '%';
  document.querySelector('.makeEndBtn').style.height = 8 + '%';
  document.querySelector('.makeWallsBtn').style.height = 8 + '%';
  document.querySelector('.makeGrassBtn').style.height = 15 + '%';
  let cells = document.querySelectorAll('td');
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == 'yellow') start = undefined;
      if (cells[i].style.backgroundColor == 'orange') end = undefined;
      cells[i].style.backgroundColor = 'darkGray';
      matrix[y][x] = 0;
    })
  }
})

document.querySelector('.findPath').addEventListener('click', function () {
  if (pointsHere()) {
    document.getElementsByClassName('findPath').disabled = true;
    findPath(start.y, start.x, end.y, end.x);
  }
  else {
    document.getElementsByClassName('findPath').disabled = true;
  }
})
