//Создание матрицы
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

//Получение рандомного числа из диапазона
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Отрисовка поля
function PaintTable() {
  const mainPlace = document.querySelector(".mainPlace");

  const table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");
      td.style.backgroundColor = trailColor;
      matrix[i][j] = 'x';
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  mainPlace.appendChild(table);
  cells = document.querySelectorAll('td');
  makeLabirint(matrix,matrix.length);
  drawMatrix();
}

function drawMatrix(){
  let row = document.querySelectorAll('tr');
  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix.length; j++){
        if (matrix[i][j] == 'x'){
          row[i].childNodes[j].style.backgroundColor = wallColor;
        }
        else if (matrix[i][j] == ' '){
          row[i].childNodes[j].style.backgroundColor = trailColor;
        }
    }
  }
}

//Проверка на наличие точек старта и конца
function pointsHere() {
  return start != undefined && end != undefined;
}

//Отрисовка конечного пути
function drawPath() {
  let draw = setInterval(function () {
    if (path.length == 0) {

      clearInterval(draw);
    }
    else {
      let current = path[0];
      let x = current.y;
      let y = current.x;
      let index = Number(y * size + x);
      cells[index].style.backgroundColor = findedPathColor;
      path.shift();
    }
  }, 50)
}

//Генерация лабиринта
function makeLabirint(table, size) {
  let startX = getRandomInRange(0, size - 1);
  let startY = getRandomInRange(0, size - 1);

  matrix[startX][startY] = ' ';
  const CellsQueue = [];
  if (startY - 2 >= 0) {
    CellsQueue.push({ x: startX, y: startY - 2 });
  }
  if (startY + 2 < size) {
    CellsQueue.push({ x: startX, y: startY + 2 });
  }
  if (startX - 2 >= 0) {
    CellsQueue.push({ x: startX - 2, y: startY });
  }
  if (startX + 2 < size) {
    CellsQueue.push({ x: startX + 2, y: startY });
  }

  while (CellsQueue.length > 0) {
    let index = getRandomInRange(0, CellsQueue.length - 1);
    let cell = CellsQueue[index];

    if (matrix[cell.x][cell.y] === ' ') {
      CellsQueue.splice(index, 1);
      continue;
    }

    matrix[cell.x][cell.y] = ' ';
    CellsQueue.splice(index, 1);

    const directions = {
      top: 1,
      bottom: 2,
      left: 3,
      right: 4
    };

    let direct = [directions.top, directions.bottom, directions.left, directions.right];

    outerLoop:
    while (direct.length > 0) {
      let index = getRandomInRange(0, direct.length - 1);
      switch (direct[index]) {
        case directions.top:
          if (cell.y - 2 >= 0 && matrix[cell.x][cell.y - 2] === ' ') {
            matrix[cell.x][cell.y - 1] = ' ';
            break outerLoop;
          }
          break;
        case directions.bottom:
          if (cell.y + 2 < size && matrix[cell.x][cell.y + 2] === ' ') {
            matrix[cell.x][cell.y + 1] = ' ';
            break outerLoop;
          }
          break;
        case directions.right:
          if (cell.x - 2 >= 0 && matrix[cell.x - 2][cell.y] === ' ') {
            matrix[cell.x - 1][cell.y] = ' ';
            break outerLoop;
          }
          break;
        case directions.left:
          if (cell.x + 2 < size && matrix[cell.x + 2][cell.y] === ' ') {
            matrix[cell.x + 1][cell.y] = ' ';
            break outerLoop;
          }
          break;
      }
      direct.splice(index, 1);
    }

    if (cell.y - 2 >= 0 && matrix[cell.x][cell.y - 2] === 'x') {
      CellsQueue.push({ x: cell.x, y: cell.y - 2 });
    }
    if (cell.y + 2 < size && matrix[cell.x][cell.y + 2] === 'x') {
      CellsQueue.push({ x: cell.x, y: cell.y + 2 });
    }
    if (cell.x - 2 >= 0 && matrix[cell.x - 2][cell.y] === 'x') {
      CellsQueue.push({ x: cell.x - 2, y: cell.y });
    }
    if (cell.x + 2 < size && matrix[cell.x + 2][cell.y] === 'x') {
      CellsQueue.push({ x: cell.x + 2, y: cell.y });
    }
  }
}
