makeAWays.addEventListener("click", function () {

    currentEvents = events.nothing;
    makeDistances();
    // Инициализируем массив феромонов
    let pheromones = [];
    for (let i = 0; i < distances.length; i++) {
        pheromones[i] = [];
        for (let j = 0; j < distances[i].length; j++) {
            pheromones[i][j] = initialPheromone;
        }
        
    }
    const numAnts = cities.length;
    let paths = [];
    let pathLengths = [];
    // Основной цикл алгоритма
    for (let iter = 0; iter < 300; iter++) {
        // Инициализируем массивы путей и длин путей для каждого муравья
        for (let i = 0; i < numAnts; i++) {
            let path = [];
            let visited = [];
            let currentCity = i;
            path.push(currentCity);
            visited[currentCity] = true;
            let pathLength = 0;
            for (let j = 0; j < distances.length; j++) {
                let probabilities = [];
                let denominator = 0;
                //Заполнение эеланий муравья пойти к тому или иному городу + denominator - сумма желаний муравья
                for (let k = 0; k < distances.length; k++) {
                    if (!visited[k]) {
                        let pheromone = pheromones[currentCity][k];
                        let distance = distances[currentCity][k];
                        let probability = Math.pow(pheromone, alpha) * Math.pow(1 / distance, beta);
                        probabilities[k] = probability;
                        denominator += probability;
                    }
                }

                let rouletteWheel = Math.random() * denominator;
                let accumulated = 0;
                for (let k = 0; k < distances.length; k++) {
                    if (!visited[k] && path.length != cities.length) {
                        accumulated += probabilities[k];
                        if (accumulated > rouletteWheel) {
                            currentCity = k;
                            break;
                        }
                    } 
                }
                path.push(currentCity);
                visited[currentCity] = true;
                pathLength += distances[path[j]][currentCity];
            }
            path.pop();
            pathLength += distances[path[path.length - 1]][path[0]];
            paths.push(path);
            pathLengths.push(pathLength);
        }

        for (let i = 0; i < paths.length; i++) {
            if (pathLengths[i] < bestPathLength) {
                bestPath = paths[i];
                bestPathLength = pathLengths[i];
            }
        }

        // Обновляем феромоны на ребрах лучшего пути и испаряем феромоны на всех ребрах
        for (let i = 0; i < pheromones.length; i++) {
            for (let j = 0; j < pheromones[i].length; j++) {
                pheromones[i][j] *= (1 - evaporationRate);
            }
        }
        for (let i = 0; i < bestPath.length - 1; i++) {
            let city1 = bestPath[i];
            let city2 = bestPath[i + 1];
            pheromones[city1][city2] += 4 / bestPathLength;
            pheromones[city2][city1] += 4 / bestPathLength;
        }



    }
    // Выводим лучший путь и его длину
    console.log(bestPathLength);
    console.log(pheromones);
    drowPath(paths, bestPath);
});