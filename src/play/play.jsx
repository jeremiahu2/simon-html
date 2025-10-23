import React from 'react';
import { Players } from './players';
import { SimonGame } from './simonGame';
import './play.css';

export function Play({ userName }) {
  return (
    <main className="container-fluid">
      <Players userName={userName} />
      <SimonGame />
    </main>
  );
}
