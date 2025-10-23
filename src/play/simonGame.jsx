import React from 'react';
import { delay } from './delay';
import './play.css';

export function SimonGame() {
  const [score, setScore] = React.useState('--');

  function resetGame() {
    setScore(0);
  }

  return (
    <div className="game">
      <div className="button-container">
        <button className="button-top-left"></button>
        <button className="button-top-right"></button>
        <button className="button-bottom-left"></button>
        <button className="button-bottom-right"></button>
        <div className="controls center">
          <div className="game-name">
            Simon<sup>&reg;</sup>
          </div>
          <div className="score center">{score}</div>
          <button className="btn btn-primary" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
