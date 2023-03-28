function makeMatrix(){
  let matrix = [];
  for (let i = 0; i < size; i++){
    matrix[i] = [];
    for (let j = 0; j < size; j++){
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PaintTable(percent){
    const mainPlace = document.querySelector(".mainPlace");

    const table = document.createElement("table");

    for (let i = 0; i < size; i++){
      const tr = document.createElement("tr");

      for (let j = 0; j < size; j++){
        const td = document.createElement("td");
        td.innerText = "";

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    mainPlace.appendChild(table);
    makeMap(percent);
    makePoints();
}

function makeWalls() {
  let cells = document.querySelectorAll('td');
  document.querySelector('.makePointsBtn').style.width = 30 + '%';
  document.querySelector('.makeWallsBtn').style.width = 50 + '%';
  for (let i = 0; i < cells.length; i++) {
    
    cells[i].addEventListener('click', function() {
      let y = Math.floor(i / size);
      let x = i - size * Math.floor(i / size);
      if (this.style.backgroundColor == 'gray'){
        this.style.backgroundColor = 'darkGreen';
        matrix[y][x] = 0;
      }
      else{
        this.style.backgroundColor = 'gray';
        matrix[y][x] = -1;
      }
      console.log(matrix);
    });
  }
}

function makePoints() {
  let cells = document.querySelectorAll('td');
  document.querySelector('.makeWallsBtn').style.width = 30 + '%';
  document.querySelector('.makePointsBtn').style.width = 50 + '%';
  for (let i = 0; i < cells.length; i++) {
   
    cells[i].addEventListener('click', function() {
      let y = Math.floor(i / size);
      let x = i - size * Math.floor(i / size);
      if (this.style.backgroundColor == 'yellow'){
        this.style.backgroundColor = 'darkGreen';
        matrix[y][x] = "0";
      }
      else{
        this.style.backgroundColor = 'yellow';
        matrix[y][x] = "1";
      }
      console.log(matrix);
    });
  }
}

function makeMap(percent){
  let marked = [];
  let count = Number(size * size * percent / 100);
  for (let i = 0; i < count; i++){
    let x = getRandomInRange(0,size - 1);
    let y = getRandomInRange(0,size - 1);
    let coords = document.querySelectorAll('tr');
    if (marked.includes({y,x})){
        i--;
    }
    else{
      matrix[y][x] = -1;
      coords[y].childNodes[x].style.backgroundColor = 'grey';
      marked.push({y,x});
    }
  }
}

function clearMap(){
  let cells = document.querySelectorAll('tr');
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      cells[i].childNodes[j].style.backgroundColor = 'green';
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


function findDist(start,finish,matrix){

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


document.querySelector('.makeTableBtn').addEventListener('click', function(){
        if (document.querySelector('.mainPlace').childElementCount != 0)document.querySelector('.mainPlace').removeChild(document.querySelector('table'));

        size = document.querySelector('.inputSize').value;
        let percent = document.querySelector('.wallPercent').value;
        matrix = makeMatrix();
        PaintTable(percent);
        console.log(matrix);
      })

document.querySelector('.makeWallsBtn').addEventListener('click', makeWalls);
document.querySelector('.makePointsBtn').addEventListener('click', makePoints);


      window.matrix;
      window.size;
      let start;
      let end;
      let path = [];