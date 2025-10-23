import React from 'react';
import { SimonGame } from './simonGame';
import { Players } from './players';
import './play.css';

export function Play({ userName }) {
  return (
    <main className="bg-secondary text-center">
      <Players userName={userName} />
      <SimonGame userName={userName} />
    </main>
  );
}
