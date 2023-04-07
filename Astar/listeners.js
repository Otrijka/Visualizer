
buttonsInit();

//Кнопка создания таблицы
makeTableButton.addEventListener('click', function () {
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

//Кнопка установки стен
setWallsButton.addEventListener('click', function () {
  setStartButton.style.height = 8 + '%';
  setEndButton.style.height = 8 + '%';
  setPathWayButton.style.height = 8 + '%';
  setWallsButton.style.height = 15 + '%';
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == startColor) start = undefined;
      if (cells[i].style.backgroundColor == endColor) end = undefined;
      cells[i].style.backgroundColor = wallColor;
      matrix[y][x] = 'x';
    })
  }
})

//Кнопка установки старта
setStartButton.addEventListener('click', function () {
  setWallsButton.style.height = 8 + '%';
  setEndButton.style.height = 8 + '%';
  setPathWayButton.style.height = 8 + '%';
  setStartButton.style.height = 15 + '%';
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == endColor) end = undefined;
      if (start == undefined) {
        cells[i].style.backgroundColor = startColor;
        matrix[y][x] = 'start';
        start = { y: y, x: x };
      }
    })
  }
})

//Кнопка установки конца
setEndButton.addEventListener('click', function () {
  setStartButton.style.height = 8 + '%';
  setWallsButton.style.height = 8 + '%';
  setPathWayButton.style.height = 8 + '%';
  setEndButton.style.height = 15 + '%';
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == startColor) start = undefined;
      if (end == undefined) {
        cells[i].style.backgroundColor = endColor;
        matrix[y][x] = 'end';
        end = { y: y, x: x };
      }
    })
  }
})

//Кнопка установки
setPathWayButton.addEventListener('click', function () {
  setStartButton.style.height = 8 + '%';
  setEndButton.style.height = 8 + '%';
  setWallsButton.style.height = 8 + '%';
  setPathWayButton.style.height = 15 + '%';
  for (let i = 0; i < cells.length; i++) {
    let y = Math.floor(i / size);
    let x = i - size * y;
    cells[i].addEventListener('click', function () {
      if (cells[i].style.backgroundColor == startColor) start = undefined;
      if (cells[i].style.backgroundColor == endColor) end = undefined;
      cells[i].style.backgroundColor = trailColor;
      matrix[y][x] = 0;
    })
  }
})

//Кнопка поиска пути
findPathButton.addEventListener('click', function () {
  if (pointsHere()) {
    findPathButton.style.disabled = true;
    findPath(start.y, start.x, end.y, end.x);
  }
  else {
    findPathButton.style.disabled = true;
  }
})
