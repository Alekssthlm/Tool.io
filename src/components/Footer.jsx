import React, { useState, useEffect } from "react";
import "./RandomQuote.css";

const Footer = () => {
  const [quote, setQuote] = useState({
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  });
  const [hoverEffect, setHoverEffect] = useState(false)
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    async function loadQuotes() {
      const response = await fetch("https://type.fit/api/quotes");
      const quotesArr = await response.json();
      setQuotes(quotesArr.slice(0, 15));
      const select = quotesArr[Math.floor(Math.random() * quotesArr.length)];
      setQuote(select);
    }

    loadQuotes();
  }, []);

  function random() {
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
  };

  return (
    <div className="container" onMouseOver={()=>{setHoverEffect(true)}} onMouseLeave={()=>{setHoverEffect(false)}}>
      <div className={hoverEffect ? "quote-show" : "quote-show quote-hide" }>"{quote.text}"</div>
      <div>
        <div className={hoverEffect ? "bottom-show" : "bottom-show bottom-hide" }>
          <div className="author">- {quote.author.split(",")[0]}</div>
          <div className="icons">
            <i className="fa-solid fa-arrows-rotate" onClick={random}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
