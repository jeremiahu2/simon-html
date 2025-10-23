import React from 'react';
import './about.css';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  React.useEffect(() => {
    setImageUrl('placeholder.jpg');
    setQuote('Show me the code');
    setQuoteAuthor('Linus Torvalds');
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        <div id="picture" className="picture-box">
          <img src={imageUrl} alt="random" />
        </div>

        <p>...</p>

        <div id="quote" className="quote-box bg-light text-dark">
          <p className="quote">{quote}</p>
          <p className="author">{quoteAuthor}</p>
        </div>
      </div>
    </main>
  );
}

