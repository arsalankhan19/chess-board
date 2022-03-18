function getTheBoxRowAndCol(indexOfBox, k) {
  return { givenRow: Math.floor(indexOfBox / k), givenCol: indexOfBox % k };
}

function createChessBoard(row, col, board, k) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < row * col; i++) {
    let color;
    let unit = document.createElement("div");
    const { givenRow, givenCol } = getTheBoxRowAndCol(i, k);
    if (givenRow % 2 && !(givenCol % 2)) {
      color = "#000";
    } else if (!(givenRow % 2) && givenCol % 2) {
      color = "#000";
    }
    unit.dataset.index = i;
    unit.dataset.rowVal = givenRow;
    unit.dataset.colVal = givenCol;

    unit.style.cssText = `background: ${color}; width: ${100 /
      col}%; height: ${100 / row}%`;
    fragment.appendChild(unit);
  }

  board.appendChild(fragment);
  board.addEventListener("click", onClick);
}

function ChessBoard(row, col, board, k) {
  createChessBoard(row, col, board, k);

  function fillDiagonals(r, c, color) {
    fillUpperLeft(r, c, color);
    fillUpperRight(r, c, color);
    fillLowerLeft(r, c, color);
    fillLowerRight(r, c, color);
  }

  function fillUpperLeft(r, c, color) {
    while (r >= 0 && c >= 0) {
      const i = +(r * k) + +c;
      board.children[i].style.background = color;
      r--;
      c--;
    }
  }

  function fillUpperRight(r, c, color) {
    while (r >= 0 && c < k) {
      const i = +(r * k) + +c;
      board.children[i].style.background = color;
      r--;
      c++;
    }
  }

  function fillLowerLeft(r, c, color) {
    while (r < k && c >= 0) {
      const i = +(r * k) + +c;
      board.children[i].style.background = color;
      r++;
      c--;
    }
  }

  function fillLowerRight(r, c, color) {
    while (r < k && c < k) {
      const i = +(r * k) + +c;
      board.children[i].style.background = color;
      r++;
      c++;
    }
  }

  function clearDiagonals() {
    for (let i = 0; i < row * col; i++) {
      const { givenRow, givenCol } = getTheBoxRowAndCol(i, k);
      if (givenRow % 2 && !(givenCol % 2)) {
        board.children[i].style.background = "#000";
      } else if (!(givenRow % 2) && givenCol % 2) {
        board.children[i].style.background = "#000";
      } else {
        board.children[i].style.background = "#fff";
      }
    }
  }

  return {
    fillDiagonals,
    clearDiagonals
  };
}

const playWithChessBoard = ChessBoard(
  8,
  8,
  document.querySelector(".board-unit"),
  8
);

function onClick(e) {
  const clickedRow = e.target.dataset.rowVal;
  const clickedCol = e.target.dataset.colVal;
  playWithChessBoard.clearDiagonals();
  playWithChessBoard.fillDiagonals(clickedRow, clickedCol, "#247d8f");
}
