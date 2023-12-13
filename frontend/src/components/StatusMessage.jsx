import React from 'react';

const StatusMessage = ({ winner, current, user }) => {
  const noMovesLeft = current.board.every(el => el !== null);

  return (
    <div className="status-message">
      {winner && (
        <>
          Победитель{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner === 'X' ? user?.name || user?.username : 'ИИ'}
          </span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          Следующий ход{' '}
          <span className={current.isXNext ? 'text-green' : 'text-orange'}>
            {current.isXNext ? user?.name || user?.username : 'ИИ'}{' '}
          </span>
        </>
      )}
      {!winner && noMovesLeft && (
        <>
          <span className="text-green">{user?.name || user?.username}</span> and{' '}
          <span className="text-orange">ИИ</span> tied
        </>
      )}
    </div>
  );
};

export default StatusMessage;
