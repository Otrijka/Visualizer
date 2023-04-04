//Поиск кластеров
function kMean() {
  if (centroidsCounter == undefined) return;
  makeStartCentriods(centroidsCounter);

  for (let iterator = 0; iterator < 50; iterator++) {

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
        avgX += Number(tempArr[i][j].x);
        avgY += Number(tempArr[i][j].y);
        countEl += 1;

      }
      avgX = Math.round(avgX / countEl);
      avgY = Math.round(avgY / countEl);
      centroids[i].x = avgX;
      centroids[i].y = avgY;
    }
      answer = tempArr;
    }
  }



