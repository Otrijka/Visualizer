//Канвас
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');


//переменные для логики
let centroidsCounter = 2;
let points = [];
let centroids = [];
let answer = [];
let colors = ['red', 'green', 'blue', 'pink', 'orange', 'darkBlue', 'purple', 'brown', 'gray'];