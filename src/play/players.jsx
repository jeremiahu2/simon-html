import React from 'react';
import './play.css';

export function Players({ userName }) {
  return (
    <div className="players">
      <div id="count">Score: 0</div>
      <div id="player-messages">Player: {userName}</div>
    </div>
  );
}
