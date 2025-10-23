import React from 'react';
import './play.css';

export function SimonGame() {
  const [score, setScore] = React.useState('--');
  const [message, setMessage] = React.useState('');

  function handleClick(name) {
    console.log('Clicked', name);
    setMessage(`Clicked ${name}`);
  }

  function startGame() {
    setScore(0);
    setMessage('Game started!');
  }

  function resetGame() {
    setScore('--');
    setMessage('');
  }

  return (
    <div className="game">
      <div className="button-container">
        <button className="button-top-left" onClick={() => handleClick('top-left')}></button>
        <button className="button-top-right" onClick={() => handleClick('top-right')}></button>
        <button className="button-bottom-left" onClick={() => handleClick('bottom-left')}></button>
        <button className="button-bottom-right" onClick={() => handleClick('bottom-right')}></button>

        <div className="controls center">
          <div className="game-name">Simon<sup>®</sup></div>
          <div className="score center">{score}</div>
          <div className="message">{message}</div>
          <button className="btn btn-primary" onClick={startGame}>Start</button>
          <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
}
