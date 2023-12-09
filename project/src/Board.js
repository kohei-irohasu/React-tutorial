import Square from "./Square";
import { calclateWinner } from "./App";

const Board = ({ xIsNext, squares, onPlay, winLine, isDraw }) => {

    function handleClick(i) {
      if (squares[i] || calclateWinner(squares).winner) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      const row = Math.floor(i / 3) + 1;
      const col = i % 3 + 1;
      const position = [row, col]
      onPlay(nextSquares, position);
    }
  
    const winner = calclateWinner(squares).winner;
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    if (isDraw) {
      status = 'Draw';
    }

    const generateBoard = () => {
      const maxRow = 3;
      const maxCol = 3;
      const board = [];

      for (let row = 0; row < maxRow; row++) {
        const rowSquare = [];
        for (let col = 0; col < maxCol; col++) {
          const index = maxCol * row + col;
          const isHighlight = winLine.includes(index);
          rowSquare.push(
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              key={index}
              isHighlight={isHighlight}
            />
          );
        }
        board.push(
          <div className="board-row" key={`row-${row}`}>
            {rowSquare}
          </div>
        );
      }
      return board;
    }

    return (
      <>
        <div className="status">{status}</div>
        {generateBoard()}
      </>
    );
  }

  export default Board;