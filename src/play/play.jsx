import './play.css';
import React from 'react';
import { Players } from './players';
import { SimonGame } from './simonGame';

export function Play({ userName }) {
  return (
    <main className="bg-secondary text-center play-page">
      <Players userName={userName} />
      <div className="play-container">
        <SimonGame />
      </div>
    </main>
  );
}
