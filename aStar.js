
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
                let cell = document.querySelectorAll('td');
                for (let i = 0; i < cell.length; i++) {
                    if (cell[i].style.backgroundColor == 'aqua') {
                        cell[i].style.backgroundColor = 'darkRed';
                    }
                }
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
            let cell = document.querySelectorAll('td')[current.x * size + current.y].style.backgroundColor = 'aqua';

            if (current === endP) {
                let temp = current;
                path.push(temp);
                while (temp.parent) {
                    path.push(temp.parent);
                    temp = temp.parent;
                }
                pathIsFind = true;
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
    }, 30)
}
