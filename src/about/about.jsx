import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Words are cheap. Show me the code.');
  const [quoteAuthor, setQuoteAuthor] = React.useState('Linus Torvalds');

  React.useEffect(() => {
    setImageUrl('placeholder.jpg');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="about-content">
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="random" />
        </div>
        <div className="simon-info mt-4">
          <p>
            Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake. The longer the sequence you repeat, the greater your score.
          </p>
          <p>
            The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit educational use only. No part of this code or program should be used outside of that definition.
          </p>
        </div>
        <div className="quote-box bg-light text-dark">
          <p className="quote">{quote}</p>
          <p className="author">{quoteAuthor}</p>
        </div>        
      </div>
    </main>
  );
}
