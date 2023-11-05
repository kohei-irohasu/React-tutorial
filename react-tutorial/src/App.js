import { useState } from "react";
import { Board } from "./Board";

const Game = () => {

  const [history, setHistory] = useState([{ squares: Array(9).fill(""), position: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [movesOrder, setMovesOrder] = useState(false);
  const {winner, winLine, isDraw} = calculateWinner(currentSquares.squares);

  const handlePlay = (nextSquares, colRow) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, position: colRow }]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    let description; 
    if (move > 0) {
      description = `Go to move: ${step.position}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <div>You are at move#...</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (movesOrder) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares.squares} 
          onPlay={handlePlay}
          winLine={winLine} 
          isDraw={isDraw}
        />
      </div>
      <div className="game-info">
        <button onClick={() => {setMovesOrder(!movesOrder)}}> A → Z ⇔ Z → A </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const result = {
    winner: null,
    winLine: [],
    isDraw: false
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      result.winner = squares[a];
      result.winLine = result.winLine.concat(lines[i]);
    }
  }
  if (result.winner === null && !squares.includes(null)) {
    result.isDraw = true;
  }
  return result;
}

export default Game;