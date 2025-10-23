import React from 'react';
import './play.css';
import { delay } from './delay';

export function SimonGame({ userName = 'Player' }) {
  const [sequence, setSequence] = React.useState([]);
  const [userSequence, setUserSequence] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState('Press Start to play');
  const buttons = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const flashButton = (buttonName) => {
    const btn = document.querySelector(`.button-${buttonName}`);
    if (!btn) return;
    btn.classList.add('flash');
    setTimeout(() => btn.classList.remove('flash'), 400);
  };

  const playSequence = async (seq) => {
    setMessage('Watch the sequence...');
    for (let btn of seq) {
      flashButton(btn);
      await delay(600);
    }
    setMessage('Your turn!');
  };

  const startGame = async () => {
    const first = buttons[Math.floor(Math.random() * 4)];
    const newSeq = [first];
    setSequence(newSeq);
    setUserSequence([]);
    setScore(0);
    await playSequence(newSeq);
  };

  const resetGame = () => {
    setScore(0);
    setSequence([]);
    setUserSequence([]);
    setMessage('Press Start to play');
  };

  const handleClick = async (buttonName) => {
    if (sequence.length === 0) return;
    flashButton(buttonName);
    const newUserSeq = [...userSequence, buttonName];
    setUserSequence(newUserSeq);

    const currentIndex = newUserSeq.length - 1;

    if (newUserSeq[currentIndex] !== sequence[currentIndex]) {
      if (score > 0) {
        const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
        storedScores.push({
          name: userName,
          score,
          date: new Date().toLocaleDateString(),
        });
        localStorage.setItem('scores', JSON.stringify(storedScores));
      }
      setMessage('Wrong! Press Start to try again');
      setScore(0);
      setSequence([]);
      setUserSequence([]);
      return;
    }

    if (newUserSeq.length === sequence.length) {
      setScore(sequence.length);
      const nextButton = buttons[Math.floor(Math.random() * 4)];
      const newSeq = [...sequence, nextButton];
      setSequence(newSeq);
      setUserSequence([]);
      await delay(500);
      playSequence(newSeq);
    }
  };

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
