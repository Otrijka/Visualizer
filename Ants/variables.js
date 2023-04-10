let cities = [];
let distances = [];
canv = document.getElementById('canvas');
ctx = canv.getContext('2d');



let bestPath;
let bestPathLength = Infinity;
// Задаем параметры алгоритма

const evaporationRate = 0.25; // коэффициент испарения феромона
const alpha = 1; // вес феромона
const beta = 3; // вес расстояния
const initialPheromone = 0.15; // начальное значение феромона
