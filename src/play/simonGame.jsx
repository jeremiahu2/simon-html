import React from 'react';
import { delay } from './delay';
import './play.css';

export function SimonGame() {
  const [sequence, setSequence] = React.useState([]);
  const [playerIndex, setPlayerIndex] = React.useState(0);
  const [score, setScore] = React.useState('--');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [message, setMessage] = React.useState('Press Start');

  const buttons = [
    { name: 'top-left', color: 'green' },
    { name: 'top-right', color: 'red' },
    { name: 'bottom-left', color: 'yellow' },
    { name: 'bottom-right', color: 'blue' },
  ];

  async function flashButton(name) {
    const btn = document.querySelector(`.button-${name}`);
    if (!btn) return;
    btn.style.filter = 'brightness(150%)';
    await delay(500);
    btn.style.filter = '';
    await delay(100);
  }

  async function playSequence(seq) {
    setIsPlaying(true);
    for (let item of seq) {
      await flashButton(item);
    }
    setIsPlaying(false);
    setMessage('Your turn!');
  }

  async function startGame() {
    const first = buttons[Math.floor(Math.random() * 4)].name;
    const newSeq = [first];
    setSequence(newSeq);
    setPlayerIndex(0);
    setScore(0);
    setMessage('Watch the sequence');
    await playSequence(newSeq);
  }

  async function handleClick(name) {
    if (isPlaying) return;

    if (name === sequence[playerIndex]) {
      setPlayerIndex(playerIndex + 1);
      if (playerIndex + 1 === sequence.length) {
        const next = buttons[Math.floor(Math.random() * 4)].name;
        const newSeq = [...sequence, next];
        setSequence(newSeq);
        setPlayerIndex(0);
        setScore(newSeq.length - 1);
        setMessage('Watch the sequence');
        await playSequence(newSeq);
      }
    } else {
      setMessage(`Game Over! Score: ${score}`);
      setSequence([]);
      setPlayerIndex(0);
      setScore('--');
    }
  }

  return (
    <div className="game">
      <div className="button-container">
        {buttons.map((btn) => (
          <button
            key={btn.name}
            className={`button-${btn.name}`}
            onClick={() => handleClick(btn.name)}
          ></button>
        ))}

        <div className="controls center">
          <div className="game-name">
            Simon<sup>&reg;</sup>
          </div>
          <div className="score center">{score}</div>
          <div className="message">{message}</div>
          <button className="btn btn-primary" onClick={startGame}>
            Start
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSequence([]);
              setPlayerIndex(0);
              setScore('--');
              setMessage('Press Start');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

