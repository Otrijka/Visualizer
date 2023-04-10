let cities = [];
let distances = [];
canv = document.getElementById('canvas');
ctx = canv.getContext('2d');



let bestPath;
let bestPathLength = Infinity;
// Задаем параметры алгоритма

const evaporationRate = 0.4; // коэффициент испарения феромона
const alpha = 2; // вес феромона
const beta = 5; // вес расстояния
const initialPheromone = 0.2; // начальное значение феромона
