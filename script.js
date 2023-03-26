let makeMatrix = (size) =>{
    let matrix = [];
    for (let i =0; i < size; i++){
        matrix.push(new Array(size).fill(1));
    }
    return matrix;
}

class Matrix{
    constructor(size){
        this.size = size;
        this.matrix = makeMatrix(size);
    }

    showMatrix(){
        console.log(this.matrix);
    }

}

    const num = 50;
    const matrix = [];

    for (let i = 0; i < num; i++) {
    matrix[i] = [];
    for (let j = 0; j < num; j++) {
        matrix[i][j] = "";
    }
    }

      // Получаем ссылку на div с классом "main-place"
      const mainPlace = document.querySelector(".main-place");

      // Создаем таблицу
      const table = document.createElement("table");

      // Проходим по строкам матрицы
      for (let i = 0; i < matrix.length; i++) {
        // Создаем строку таблицы
        const tr = document.createElement("tr");

        // Проходим по элементам строки матрицы
        for (let j = 0; j < matrix.length; j++) {
          // Создаем ячейку таблицы
          const td = document.createElement("td");

          // Устанавливаем текст ячейки равным значению элемента матрицы
          td.innerText = matrix[i][j];

          // Добавляем ячейку в строку таблицы
          tr.appendChild(td);
        }

        // Добавляем строку в таблицу
        table.appendChild(tr);
      }

      // Добавляем таблицу в div с классом "main-place"
      mainPlace.appendChild(table);

      const boxes = document.querySelectorAll('td');
      
      // перебираем все элементы и назначаем обработчик события "click"
      boxes.forEach(box => {
        box.addEventListener('click', function() {
          if(this.style.backgroundColor == 'white'){
            this.style.backgroundColor = 'aqua'
          }
          else{
            this.style.backgroundColor = 'white';
          }
        });
      });

      