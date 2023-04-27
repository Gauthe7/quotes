import React, { useState, useEffect } from "react";

function Qoutepage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [bookmarked, setBookmarked] = useState([]);

  
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedQuotes"));
    if (storedBookmarks) {
        setBookmarked(storedBookmarks);
    }
  }, []);

  
  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedQuotes", JSON.stringify(bookmarked));
  }, [bookmarked]);

  const Bookmark = () => {
    const newBookmark = { quote, author };
    setBookmarked([...bookmarked, newBookmark]);
  };

  const NewQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  };

  return (
    <div>
      <h1>Random Quotes</h1>
      <p>{quote}</p>
      <p>- {author}</p>
      <button onClick={NewQuote}>New Quote</button>
      <button onClick={Bookmark}>Bookmark Quote</button>
      <h2>Bookmarked Quotes</h2>
      <ul>
        {bookmarked.map((bookmark, index) => (
          <li key={index}>
            <p>{bookmark.quote}</p>
            <p>- {bookmark.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Qoutepage;