import React from "react";
import { delay } from "./delay";
import "./play.css";

export function SimonGame() {
  const [sequence, setSequence] = React.useState([]);
  const [playerIndex, setPlayerIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [message, setMessage] = React.useState("Press Start to Play");

  const buttons = ["top-left", "top-right", "bottom-left", "bottom-right"];

  // Flash a button visually
  async function flashButton(color) {
    const btn = document.querySelector(`.button-${color}`);
    btn.classList.add("active");
    await delay(500);
    btn.classList.remove("active");
    await delay(100);
  }

  // Play the current sequence to the player
  async function playSequence(seq) {
    setIsPlaying(true);
    for (let color of seq) {
      await flashButton(color);
    }
    setIsPlaying(false);
    setMessage("Your turn!");
  }

  // Start a new game
  async function startGame() {
    const firstColor = buttons[Math.floor(Math.random() * 4)];
    const newSeq = [firstColor];
    setSequence(newSeq);
    setPlayerIndex(0);
    setScore(0);
    setMessage("Watch the sequence");
    await playSequence(newSeq);
  }

  // Handle player clicking a button
  async function handleClick(color) {
    if (isPlaying) return; // ignore clicks while sequence is playing

    // Check player input
    if (color === sequence[playerIndex]) {
      setPlayerIndex(playerIndex + 1);

      // Completed the sequence correctly
      if (playerIndex + 1 === sequence.length) {
        const nextColor = buttons[Math.floor(Math.random() * 4)];
        const newSeq = [...sequence, nextColor];
        setSequence(newSeq);
        setPlayerIndex(0);
        setScore(newSeq.length - 1);
        setMessage("Watch the sequence");
        await playSequence(newSeq);
      }
    } else {
      // Player made a mistake
      setMessage(`Game Over! Score: ${score}`);
      setSequence([]);
      setPlayerIndex(0);
    }
  }

  return (
    <div className="game">
      <div className="button-container">
        {buttons.map((color) => (
          <button
            key={color}
            className={`button-${color}`}
            onClick={() => handleClick(color)}
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
              setScore(0);
              setMessage("Press Start to Play");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

