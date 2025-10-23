import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores') || '[]');
    setScores(storedScores);
  }, []);

  const scoreRows = scores.length
    ? scores.map((score, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      ))
    : [
        <tr key="0">
          <td colSpan="4">Be the first to score</td>
        </tr>,
      ];

  return (
    <main className="container-fluid bg-secondary text-center">
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
    </main>
  );
}
