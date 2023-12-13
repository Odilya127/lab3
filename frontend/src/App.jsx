import React, { useState } from 'react';
import Board from './components/Board';
import StatusMessage from './components/StatusMessage';
import Login from './components/Login';
import { calculateWinner } from './helpers';

import './styles/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const [user, setUser] = useState();
  const [loginData, setLoginData] = useState({
    username: '',
    name: '',
    password: '',
    repeatPassword: '',
  });

  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = async position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }

        return square;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setCurrentMove(prev => prev + 1);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  const handleSignIn = event => {
    event.preventDefault();

    fetch('http://localhost:8080/backend/login', {
      method: 'POST',
      body: `username=${loginData.username}&password=${loginData.password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(user => {
        setUser(user);
      });
  };

  const handleRegister = event => {
    event.preventDefault();

    fetch('http://localhost:8080/backend/register', {
      method: 'POST',
      body: JSON.stringify({
        username: loginData.username,
        name: loginData.name,
        password: loginData.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 200) setUser({ ...loginData });
    });
  };

  const game = (
    <>
      <h1>
        КРЕСТИКИ-<span className="text-green">НОЛИКИ</span>
      </h1>
      <StatusMessage user={user} winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
        history={history}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Начать новую игру
      </button>
      <div className="bg-balls" />
    </>
  );

  return (
    <div className="app">
      {user ? (
        game
      ) : (
        <Login
          handleSignIn={handleSignIn}
          handleRegister={handleRegister}
          loginDataOffset={{ loginData, setLoginData }}
        />
      )}
      <div className="bg-balls" />
    </div>
  );
};

export default App;
