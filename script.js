function makeMatrix(size){
  let matrix = [];
  for (let i = 0; i < size; i++){
    matrix[i] = [];
    for (let j = 0; j < matrix[i].size; j++){
      matrix[i][j] = "1";
    }
  }
  return matrix;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PaintTable(size){
    this.matrixSize = size;
    const matrix = makeMatrix(this.matrixSize);

    const mainPlace = document.querySelector(".mainPlace");

    const table = document.createElement("table");

    for (let i = 0; i < matrix.length; i++){
      const tr = document.createElement("tr");

      for (let j = 0; j < matrix.length; j++){
        const td = document.createElement("td");

        td.innerText = "";

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    mainPlace.appendChild(table);
  }

function eventChangeTableCellColor(){
  let cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.addEventListener('click', function(){

      if(this.style.backgroundColor == 'brown'){
        this.style.backgroundColor = 'red';
      }
      else if(this.style.backgroundColor == 'red'){
        this.style.backgroundColor = 'cadetblue';
      }
      else{
        this.style.backgroundColor = 'brown';
      }
      
      
    });
  });
}

function makeMap(percent, size){
  clearMap(size);
  let marked = [];
  let count = Number(size * size * percent / 100);
  console.log(count);
  for (let i = 0; i < count; i++){
    let x = getRandomInRange(0,size - 1);
    let y = getRandomInRange(0,size - 1);
    let coords = document.querySelectorAll('tr');
    if (marked.includes({y,x})){
        i--;
    }
    else{
      coords[y].childNodes[x].style.backgroundColor = 'brown';
      marked.push({y,x});
    }
    console.log();
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

function paintMorCells(){
  let trArray = document.querySelectorAll('tr');
  // Устанавливаем индекс, который будет использоваться для отображения td элементов по одному
  let currentTdIndex = 0;
  // Устанавливаем интервал в 1 секунду
  let interval = setInterval(function() {
    // Проверяем, есть ли еще td элементы, которые нужно отобразить
    if (currentTdIndex < trArray.length) {
      // Если да, то отображаем следующий tr элемент
      trArray[currentTdIndex].style.visibility = 'visible';
      // Увеличиваем индекс для следующего отображения
      currentTdIndex++;
    } else {
      // Если нет, то очищаем интервал
      clearInterval(interval);
    }
  }, 10);
}
      let size = prompt("Введите размер матрицы");
      
      while (size <= 0){
        size = prompt("Введите корректный размер!");
      }
      PaintTable(Number(size));
      paintMorCells();
      makeMap(50, size);
      eventChangeTableCellColor();
