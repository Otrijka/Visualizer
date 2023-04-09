let vertex = [0,1,2,3,4];

function Chromosome(way,wayCost){
    this.way = way;
    this.cost = wayCost;
}

let population = [
    [0,1,2,3,4],
    [0,1,3,2,4],
    [0,3,1,4,2],
    [0,2,4,3,1],
    [0,2,1,3,4],
    [0,3,2,1,4],
    [0,3,2,4,1],
]

let costs = [14,16,20,11,15,25,19];

let population2 = [];

for (let i = 0; i < vertex.length; i++){
    population2.push(new Chromosome(population[i],costs[i]));
}

console.log(population2);