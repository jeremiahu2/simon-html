import React from 'react';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    // Mocking for now — real fetch can be added later
    setImageUrl('placeholder.jpg');
    setQuote('Words are cheap. Show me the code.');
    setQuoteAuthor('- Linus Torvalds');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div className="about-content">
        {/* Optional image */}
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="random" />
        </div>

        {/* Quote box */}
        <div className="quote-box bg-light text-dark">
          <p className="quote">{quote}</p>
          <p className="author">{quoteAuthor}</p>
        </div>

        {/* Simon description */}
        <div className="simon-info mt-4">
          <p>
            Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake. The longer the sequence you repeat, the greater your score.
          </p>
          <p>
            The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit educational use only. No part of this code or program should be used outside of that definition.
          </p>
        </div>
      </div>
    </main>
  );
}
