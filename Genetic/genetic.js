//Генерация начальной популяции
function makeFirstPopulation(populationSize){
    let way = [];
    for (let i = 0; i < cities.length; i++) {
        way.push(i);
    }
    for (let i = 0; i < populationSize; i++) {
        let temp = shuffleArray(way);
        population.push(new Individual(temp, wayLength(temp)));
    }
}

//Объект особи
function Individual(way, wayLength){
    this.way = way;
    this.length = wayLength;
}

//Создание новой популяции
function makeNewGeneration(populationSize){
    let requiredChilds = Math.floor(populationSize/2);
    for (let childs = 0; childs < requiredChilds; childs++){
        let fatherIndex = getRandomInRange(0,populationSize-1);
        let motherIndex = getRandomInRange(0,populationSize-1);
        while (motherIndex === fatherIndex) motherIndex = getRandomInRange(0,populationSize - 1);

        reproduction(population[fatherIndex].way,population[motherIndex].way);
    }

    population.sort((individual1, individual2) => individual1.length - individual2.length);
    population.splice(Math.ceil(population.length / 2));
}


//Создание детей
function reproduction(father,mother){
    let border = getRandomInRange(1,father.length - 2);
    let son = father.slice(0,border);
    let doughter = mother.slice(0,border);
    
    for (let i = 0; i < father.length; i++) {
        if (!doughter.includes(father[i])) {
            doughter.push(father[i]);
        }
        if (doughter.length === father.length) {
            break;
        }
    }
    for (let i = 0; i < mother.length; i++) {
        if (!son.includes(mother[i])) {
            son.push(mother[i]);
        }
        if (son.length === mother.length) {
            break;
        }
    }
    mutation(son);
    mutation(doughter);

    population.push(new Individual(son, wayLength(son)));
    population.push(new Individual(doughter, wayLength(doughter)));
}

// Мутация ребёнка
function mutation(child){
    let i = getRandomInRange(0, child.length - 1);
    let j = getRandomInRange(0, child.length - 1);
    while (i < j) {
        const temp = child[i];
        child[i] = child[j];
        child[j] = temp;
        i++;
        j--;
    }
}

//Основной алгоритм
function geneticAlg() {
    
    let populationSize = Math.pow(cities.length,2);
    population = [];

    fillADJmatrix();
    makeFirstPopulation(populationSize);

    let generationWithoutChanges = 0;
    let bestPath = population[0].length;

    let changeGeneration = setInterval(()=>{
        if (generationWithoutChanges >= 350){
            clearInterval(changeGeneration);
            drowPath(population[0].way,'blue');
            return;
        }
        
        makeNewGeneration(populationSize);
        drowPath(population[0].way);
        
        if (bestPath > population[0].length){
            bestPath = population[0].length;
            generationWithoutChanges = 0;
        }
        generationWithoutChanges++;
        
    },8)
}

