import './play.css';
import React from 'react';
import { Players } from './players';
import { SimonGame } from './simonGame';

export function Play({ userName }) {
  return (
    <main className="bg-secondary text-center">
      <Players userName={userName} />
      <SimonGame userName={userName} />
    </main>
  );
}
