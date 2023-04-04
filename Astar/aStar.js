
//Эвристика по Манхэттену
function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
    return d1 + d2;
}

//Создание объекта из точки
function GridPoint(x, y) {
    this.x = x; 
    this.y = y; 
    this.f = 0; //Полная стоимость клетки
    this.g = 0; //Стоимость от начальной до текущей точки
    this.h = 0; //эвристическая функция расчетных затрат от текущей точки сетки до цели
    this.neighbors = []; // Соседи 
    this.parent = undefined; // Родитель из которого пришла эта точка

    // Получение соседей
    this.updateNeighbors = function (grid) {
        let i = this.x;
        let j = this.y;
        if (i + 1 < size && matrix[i + 1][j] != 'x') {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i - 1 >= 0 && matrix[i - 1][j] != 'x') {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j + 1 < size && matrix[i][j + 1] != 'x') {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j - 1 >= 0 && matrix[i][j - 1] != 'x') {
            this.neighbors.push(grid[i][j - 1]);
        }
    };
}

//Инициализация матрицы из объектов
function init() {
    for (let i = 0; i < size; i++) {
        grid[i] = new Array(size);
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[i][j] = new GridPoint(i, j);
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[i][j].updateNeighbors(grid);
        }
    }
}

//Поиск пути A*
function findPath(startY, startX, endY, endX) {
    init();
    let openSet = [];
    let closedSet = [];
    let startP = grid[startY][startX];
    let endP = grid[endY][endX];
    let current;
    openSet.push(startP);
    let intervalId = setInterval(function () {
        if (openSet.length == 0) {
            clearInterval(intervalId);
            //no solution by default
            pathIsFind = false;
            console.log("No path");
            // return the traced path
            if (pathIsFind == false) {
                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].style.backgroundColor == allPathColor) {
                        cells[i].style.backgroundColor = emptyPathColor;
                    }
                }
                alert("Пути не существует!");
            }
            return;
        }
        else {
            let lowestIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIndex].f) {
                    lowestIndex = i;
                }
            }
            current = openSet[lowestIndex];
            if (current.x * size + current.y != startY * size + startX && current.x * size + current.y != endY * size + endX){
                cells[current.x * size + current.y].style.backgroundColor = allPathColor;
            }

            if (current === endP) {
                let temp = current;
                while (temp.parent) {
                    path.push(temp.parent);
                    temp = temp.parent;
                }
                pathIsFind = true;
                path.splice(path.length - 1);
                // return the traced path
                clearInterval(intervalId);
                console.log("Path has found");
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
                    neighbor.h = heuristic(neighbor, grid[endY][endX]);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }
        }
        drawPath();
    }, 10)
}
