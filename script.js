function makeMatrix() {
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

function PaintTable(percent) {
  const mainPlace = document.querySelector(".mainPlace");

  const table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");
      td.style.backgroundColor = 'darkGreen';

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  mainPlace.appendChild(table);
  makeMap(percent);
}

function makeGrass() {
  let cells = document.querySelector('td');
}

function makeMap(percent) {
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
      coords[y].childNodes[x].style.backgroundColor = 'grey';
      marked.push({ y, x });
    }
  }
}

function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

function GridPoint(x, y) {
  this.x = x; //x location of the grid point
  this.y = y; //y location of the grid point
  this.f = 0; //total cost function
  this.g = 0; //cost function from start to the current grid point
  this.h = 0; //heuristic estimated cost function from current grid point to the goal
  this.neighbors = []; // neighbors of the current grid point
  this.parent = undefined; // immediate source of the current grid point

  // update neighbors array for a given grid point
  this.updateNeighbors = function (grid) {
    let i = this.x;
    let j = this.y;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

function init() {
  //making a 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new GridPoint(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].updateNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);

  console.log(grid);
}



function search() {
  init();
  while (openSet.length > 0) {
    //assumption lowest index is the first one to begin with
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("DONE!");
      // return the traced path
      return path.reverse();
    }

    //remove current from openSet
    openSet.splice(lowestIndex, 1);
    //add current to closedSet
    closedSet.push(current);

    let neighbors = current.neighbors;

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor)) {
        let possibleG = current.g + 1;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (possibleG >= neighbor.g) {
          continue;
        }

        neighbor.g = possibleG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }
  }

  //no solution by default
  return [];
}
//Начало программы
window.matrix;
window.size
let start;
let end;
let path = [];

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
  let percent = document.querySelector('.wallPercent').value;
  matrix = makeMatrix();
  PaintTable(percent);
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
        start = { Y: y, X: x };
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
        end = { Y: y, X: x };
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
      cells[i].style.backgroundColor = 'darkGreen';
      matrix[y][x] = 0;
    })
  }
})