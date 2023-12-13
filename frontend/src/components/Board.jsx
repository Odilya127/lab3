import React, { useEffect } from 'react';
import Square from './Square';

const Board = ({ board, handleSquareClick, winningSquares, history }) => {
  const isCurrentUser = !history[history.length - 1].isXNext;
  const renderSquare = position => {
    const isWinningSquare = winningSquares.includes(position);

    return (
      <Square
        value={board[position]}
        onClick={() => (!isCurrentUser ? handleSquareClick(position) : {})}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  useEffect(async () => {
    const rightValues = history[history.length - 1].board
      .map((el, index) => {
        if (!el) return index;

        return undefined;
      })
      .filter(Boolean);

    const res =
      isCurrentUser &&
      (await fetch('http://localhost:8080/backend/move', {
        method: 'POST',
        body: JSON.stringify(rightValues),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          return response.json();
        })
        .then(res => res));

    setTimeout(() => {
      isCurrentUser && handleSquareClick(res);
    }, 1200);
  }, [history]);

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
