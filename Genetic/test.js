function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dist(point1, point2) {
    return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}


function makeDistances() {
    for (let i = 0; i < cities.length; i++) {
        EdgeDistances[i] = [];
    }
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++) {
            EdgeDistances[i][j] = dist(cities[i], cities[j]);
        }
    }
}


function makePopulel(arr,length){
    return {way:arr,length:length};
}

function City(y, x) {
    this.y = y;
    this.x = x;
}

let cities = [];
let EdgeDistances = [];
let lengths = [];
let population;
let tempPopulation = new Set();
let percentOfMutation = 50;
let populationSize = 6;



for (let i = 0; i < 9; i++) {
    cities.push(new City(getRandomInRange(0, 100), getRandomInRange(0, 100)));
}

makeDistances();

//Генерация начальной популяции
while (tempPopulation.size !== populationSize) {
    let tempIindividual = new Set();
    let individual;

    while (tempIindividual.size != cities.length) {
        let currentCity = getRandomInRange(0, cities.length - 1);
        tempIindividual.add(currentCity);
    }
    individual = Array.from(tempIindividual);
    tempPopulation.add(individual);
}
population = Array.from(tempPopulation);

console.log("Population: ", population);


for (let i = 0; i < populationSize; i++) {
    let l = 0;
    for (let j = 0; j < cities.length - 1; j++) {
        l += EdgeDistances[population[i][j]][population[i][j + 1]];
    }
    l += EdgeDistances[population[i][0]][population[i][population[i].length - 1]];
    population[i] = { way: population[i], length: l };
    lengths.push(l);
}

console.log(population);

//Основная логика
for (let iter = 0; iter < 3; iter++) {

    let fatherCityIndex = getRandomInRange(0, population.length - 1);
    let motherCityIndex = getRandomInRange(0, population.length - 1);

    while (fatherCityIndex == motherCityIndex) motherCityIndex = getRandomInRange(0, population.length - 1);

    let father = [].concat(population[fatherCityIndex].way);
    let mother = [].concat(population[motherCityIndex].way);


    let breakPoint = Math.ceil((father.length - 1) / 2);

    let usedGens = [];
    let firstChild = [];
    let secondChild = [];

    for (let i = 0; i < breakPoint; i++) {
        firstChild.push(father[i]);
        usedGens.push(father[i]);
    }

    for (let i = breakPoint; i < cities.length; i++) {
        if (!usedGens.includes(mother[i])) {
            firstChild.push(mother[i]);
            usedGens.push(mother[i]);
        }
    }

    for (let i = breakPoint; i < cities.length; i++) {
        if (!usedGens.includes(father[i])) {
            firstChild.push(father[i]);
            usedGens.push(father[i]);
        }
    }

    usedGens = [];

    for (let i = 0; i < breakPoint; i++) {
        secondChild.push(mother[i]);
        usedGens.push(mother[i]);
    }

    for (let i = breakPoint; i < cities.length; i++) {
        if (!usedGens.includes(father[i])) {
            secondChild.push(father[i]);
            usedGens.push(father[i]);
        }
    }

    for (let i = breakPoint; i < cities.length; i++) {
        if (!usedGens.includes(mother[i])) {
            secondChild.push(mother[i]);
            usedGens.push(mother[i]);
        }
    }


    if (getRandomInRange(0, 100) <= percentOfMutation) {
        console.log('mutation fc');
        let firstGen = getRandomInRange(0, firstChild.length - 1);
        let secondGen = getRandomInRange(0, firstChild.length - 1);
        while (firstGen === secondGen) secondGen = getRandomInRange(0, firstChild.length - 1);

        let tempGen = firstChild[firstGen];

        firstChild[firstGen] = firstChild[secondGen];
        firstChild[secondGen] = tempGen;


    }

    if (getRandomInRange(0, 100) <= percentOfMutation) {
        console.log('mutation sc');
        let firstGen = getRandomInRange(0, secondChild.length - 1);
        let secondGen = getRandomInRange(0, secondChild.length - 1);
        while (firstGen === secondGen) secondGen = getRandomInRange(0, secondChild.length - 1);

        let tempGen = secondChild[firstGen];

        secondChild[firstGen] = secondChild[secondGen];
        secondChild[secondGen] = tempGen;
    }


    let l1 = 0;
    let l2 = 0;
    for (let j = 0; j < firstChild.length - 1; j++) {
        l1 += EdgeDistances[firstChild[j]][firstChild[j + 1]];
        l2 += EdgeDistances[secondChild[j]][secondChild[j + 1]];
    }
    l1 += EdgeDistances[firstChild[0]][firstChild[firstChild[firstChild.length - 1]]];
    l2 += EdgeDistances[secondChild[0]][secondChild[secondChild[secondChild.length - 1]]];
    lengths.push(l1);
    lengths.push(l2);

    population.push(makePopulel(firstChild,l1));
    population.push(makePopulel(secondChild,l2));

    console.log("new population", population);

    population.sort((individual1, individual2) => individual1.length - individual2.length);

    console.log("new sorted population", population);

    population.pop();
    population.pop();

    console.log(`iter ${iter} ------------------------------------------------`);
}


