import React from 'react';
import './play.css';

const BUTTONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const BUTTON_COLORS = {
  'top-left': 'green',
  'top-right': 'red',
  'bottom-left': 'yellow',
  'bottom-right': 'blue'
};

export function SimonGame({ userName }) {
  const [sequence, setSequence] = React.useState([]);
  const [userSequence, setUserSequence] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState('Press Start to play');
  const [isUserTurn, setIsUserTurn] = React.useState(false);
  const [flashButton, setFlashButton] = React.useState(null);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Start a new game
  const startGame = async () => {
    setScore(0);
    setSequence([]);
    setUserSequence([]);
    setMessage('Watch the sequence');
    await delay(300);
    addStep([]);
  };

  // Add a new step and play the sequence
  const addStep = async (currentSequence) => {
    const nextStep = BUTTONS[Math.floor(Math.random() * BUTTONS.length)];
    const newSequence = [...currentSequence, nextStep];
    setSequence(newSequence);

    setIsUserTurn(false);
    for (let btn of newSequence) {
      setFlashButton(btn);
      await delay(500);
      setFlashButton(null);
      await delay(200);
    }

    setMessage('Your turn!');
    setUserSequence([]);
    setIsUserTurn(true);
  };

  // Handle user clicks
  const handleClick = async (btn) => {
    if (!isUserTurn) return;

    const newUserSequence = [...userSequence, btn];
    setUserSequence(newUserSequence);

    // Flash clicked button
    setFlashButton(btn);
    await delay(200);
    setFlashButton(null);

    // Check correctness
    const currentIndex = newUserSequence.length - 1;
    if (btn !== sequence[currentIndex]) {
      setMessage('Wrong! Game over');
      setIsUserTurn(false);
      saveScore(score);
      return;
    }

    // Complete sequence correctly
    if (newUserSequence.length === sequence.length) {
      setScore(sequence.length);
      setMessage('Correct! Next round...');
      await delay(500);
      addStep(sequence);
    }
  };

  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setMessage('Press Start to play');
    setIsUserTurn(false);
    setFlashButton(null);
  };

  // Save score to localStorage
  const saveScore = (finalScore) => {
    if (!userName || finalScore === 0) return;

    const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
    const newScore = {
      name: userName,
      score: finalScore,
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('scores', JSON.stringify([...storedScores, newScore]));
  };

  // Style for flashing buttons
  const getButtonStyle = (btn) => ({
    backgroundColor: flashButton === btn ? 'white' : BUTTON_COLORS[btn]
  });

  return (
    <div className="game">
      <div className="button-container">
        <button
          className="button-top-left"
          style={getButtonStyle('top-left')}
          onClick={() => handleClick('top-left')}
        />
        <button
          className="button-top-right"
          style={getButtonStyle('top-right')}
          onClick={() => handleClick('top-right')}
        />
        <button
          className="button-bottom-left"
          style={getButtonStyle('bottom-left')}
          onClick={() => handleClick('bottom-left')}
        />
        <button
          className="button-bottom-right"
          style={getButtonStyle('bottom-right')}
          onClick={() => handleClick('bottom-right')}
        />

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
