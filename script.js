function makeMatrix(size){
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

function PaintTable(size, percent,matrix){
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
    makeMap(percent,size,matrix);
    eventChangeTableCellColor(matrix,size);
}

function eventChangeTableCellColor(matrix, size) {
  let cells = document.querySelectorAll('td');
  console.log(cells);
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {
      if (this.style.backgroundColor == 'brown') {
        this.style.backgroundColor = 'green';
        matrix[Math.floor(i / size)][i - size * Math.floor(i / size)] = 1;
      } 
      else if (this.style.backgroundColor == 'green') {
        this.style.backgroundColor = 'cadetblue';
        matrix[Math.floor(i / size)][i - size * Math.floor(i / size)] = 0;
      } 
      else {
        this.style.backgroundColor = 'brown';
        matrix[Math.floor(i / size)][i - size * Math.floor(i / size)] = -1;
      }
      console.log(matrix);
    });
  }
}

function makeMap(percent, size, matrix){
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
      coords[y].childNodes[x].style.backgroundColor = 'brown';
      marked.push({y,x});
    }
  }
}

function clearMap(size){
  let cells = document.querySelectorAll('tr');
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      cells[i].childNodes[j].style.backgroundColor = 'cadetblue';
    }
  }
}

let btnGenerate = document.querySelector('.makeTableBtn');
let matrix;
      btnGenerate.addEventListener('click', function(){
        if (document.querySelector('.mainPlace').childElementCount != 0)document.querySelector('.mainPlace').removeChild(document.querySelector('table'));

        let size = document.querySelector('.inputSize').value;
        let percent = document.querySelector('.wallPercent').value;
        matrix = makeMatrix(size);
        PaintTable(size,percent,matrix);
        console.log(matrix);
      })

