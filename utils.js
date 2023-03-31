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
      td.style.backgroundColor = trailColor;

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  mainPlace.appendChild(table);
  cells = document.querySelectorAll('td');
  makeMap();
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
      coords[y].childNodes[x].style.backgroundColor = wallColor;
      marked.push({ y, x });
    }
  }
}

function pointsHere() {
  return start != undefined && end != undefined;
}

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
  }, 80)
}
