let cities = [];
let distances = [];
canv = document.getElementById('canvas');
ctx = canv.getContext('2d');

canv.width = 600;
canv.height = 600;




let bestPath;
let bestPathLength = Infinity;
// Задаем параметры алгоритма

const evaporationRate = 0.36; // коэффициент испарения феромона
const alpha = 1; // вес феромона
const beta = 3; // вес расстояния
const initialPheromone = 0.2; // начальное значение феромона
