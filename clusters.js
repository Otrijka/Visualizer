function makeMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = { y: i, x: j };
    }
  }
  return matrix;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStartCentriods(centroidsCounter) {
  while (centroids.length != centroidsCounter) {
    let temp = getRandomInRange(0, points.length - 1);
    if (!centroids.includes(points[temp])) {
      centroids.push(points[temp]);
    }
  }
  console.log(centroids);
}

function dist(point1, point2) {
  return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}

function kMean(points, centroidsCounter) {
  makeStartCentriods(centroidsCounter);

  for (let iterator = 0; iterator < 200; iterator++) {

    let distancePointsToCentroids = new Array(points.length);
    for (let i = 0; i < points.length; i++) {
      distancePointsToCentroids[i] = [];
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < centroidsCounter; j++) {
        let distance = dist(points[i], centroids[j]);
        distancePointsToCentroids[i].push(distance);
      }
    }
    //console.log(distancePointsToCentroids);

    let tempCentroid = new Array(centroidsCounter);
    for (let i = 0; i < centroidsCounter; i++) {
      tempCentroid[i] = [];
    }
    //console.log(tempCentroid);

    let tempArr = new Array(centroidsCounter);
    for (let i = 0; i < centroidsCounter; i++) {
      tempArr[i] = [];
    }

    for (let i = 0; i < points.length; i++) {
      let minDist = distancePointsToCentroids[i][0];
      let centroidIndex = 0;
      for (let j = 0; j < centroidsCounter; j++) {
        if (minDist > distancePointsToCentroids[i][j]) {
          minDist = distancePointsToCentroids[i][j];
          centroidIndex = j;
        }
      }
      tempArr[centroidIndex].push(points[i]);
    }

    for (let i = 0; i < centroidsCounter; i++) {
      let avgX = 0, avgY = 0;
      let countEl = 0;
      for (let j = 0; j < tempArr[i].length; j++) {
        if (tempArr[i][j] != undefined) {
          avgX += Number(tempArr[i][j].x);
          avgY += Number(tempArr[i][j].y);
          countEl += 1;
        }
      }
      avgX = Math.round(avgX / countEl);
      avgY = Math.round(avgY / countEl);
      centroids[i].x = avgX;
      centroids[i].y = avgY;
    }
    if (iterator == 199) {
      console.log("final Results:");
      for (let i = 0; i < centroidsCounter; i++) {
        console.log(`Cluster ${i} consists:`);
        for (let j = 0; j < tempArr[i].length; j++) {
          if (tempArr[i][j] != undefined) console.log(tempArr[i][j]);
        }
      }
      answer = tempArr;
      console.log(-1);
      return;
    }
  }
  //console.log(centroids);
}

function drawClusters(answer, centroidsCounter) {
  for (let i = 0; i < centroidsCounter; i++) {
    for (let j = 0; j < answer[i].length; j++) {
      let y = answer[i][j].y;
      let x = answer[i][j].x;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i];
      ctx.fill();
    }
  }
}
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');

let centroidsCounter;
let points = [];
let centroids = [];
let answer = [];
let colors = ['red', 'green', 'blue', 'pink', 'orange', 'darkBlue', 'purple', 'brown', 'yellow', 'gray'];

canvas.addEventListener('mouseup', function (event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  points.push({ y: y, x: x });
});

let findBtn = document.querySelector('.findClusters');
findBtn.addEventListener('click', function () {
  if (points.length == 0) {
    alert("Поле пустое!");
  }
  else {
    centroidsCounter = document.querySelector('.clusterCounter').value;
    console.log("START!!!");
    kMean(points, centroidsCounter);
    drawClusters(answer, centroidsCounter);
    drawClusters(answer, centroidsCounter);

    for (let i = 0; i < centroidsCounter; i++) {
      let x = centroids[i].x;
      let y = centroids[i].y;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'yellow';
      ctx.fill();
      ctx.closePath();
    }
  }
})
