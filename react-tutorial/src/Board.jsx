import Square from "./square";
import { calculateWinner } from "./App";

export const Board = ({ xIsNext, squares, onPlay, winLine, isDraw }) => {
  
  const handleClick = (i) => {
  
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    let col = i % 3 + 1;
    let row = Math.floor(i / 3) + 1;
    const colRow = [col, row];
    onPlay(nextSquares, colRow);
  }

  const winner = calculateWinner(squares).winner;
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = "Next player:" + (xIsNext ? "X" : "O");
  }
  if (isDraw) {
    status = "Draw";
  }

  const row = [];
  for (let i = 0; i < 3; i++) {
    const squareRow = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const isHighlight = winLine.includes(index);
      squareRow.push(
        <Square 
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          key={index}
          isHighlight={isHighlight}
        />
      );
    }
    row.push(
      <div className="board-row" key={i}>
        {squareRow}
      </div>
    );
  }


  return (
    <>
      <div className="status">{status}</div>
      {row}
    </>
  );
}
