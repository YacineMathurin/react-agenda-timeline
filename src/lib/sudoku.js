const sudoku = [
  [1, 4, 2, 3],
  [3, 2, 4, 1],

  [4, 1, 3, 2],
  [2, 3, 1, 4],
];

// Checking Lines
let isInvalidLine = false;
sudoku.forEach((el, idx) => {
  isInvalidLine = new Set(el).size !== el.length;
  if (isInvalidLine) {
    console.log(`Line ${idx} is invaline`);
  }
});

// Checking Columns
let col = [];
for (let index = 0; index < sudoku[0].length; index++) {
  col = [];
  sudoku.forEach((el) => {
    col.push(el[index]);
  });

  if (new Set(col).size !== col.length) {
    console.log(`Column ${index} is invaline`);
  }
}

// Checking 3x3 blocs
let lineRound = 1;
let columnRound = 1;
let blockSize = 2;
let res = [];

// Stop the execution if no more line in the matrix
while (lineRound * blockSize <= sudoku.length) {
  res = [];

  for (
    let j = lineRound * blockSize - blockSize;
    j < lineRound * blockSize;
    j++
  ) {
    for (
      let k = columnRound * blockSize - blockSize;
      k < columnRound * blockSize;
      k++
    ) {
      res.push(sudoku[j][k]);
    }
  }
  // Compute here
  console.log("Res", lineRound, columnRound, res);
  if (new Set(res).size !== res.length) {
    console.log(`Block is invaline`);
  }
  // Determine Rounds
  if (columnRound * blockSize === 4) {
    lineRound += 1;
    columnRound = 1;
  } else columnRound += 1;
}

/*

let index = 0;
for (index = 0; index < 3; index++) {
  if (index === 1) {
    break;
  }
}
console.log(index);
if (index !== data.length) return false;
*/
