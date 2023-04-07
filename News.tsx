import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

interface Article {
  title: string;
  urlToImage: string;
  description: string;
  content: string;
  publishedAt: string;
}

function News() {
  const [data, setData] = useState<Article[]>([]);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=bitcoin&apiKey=d54212ef837b4c72bb09987f5b0434b1'
        );
        const json = await response.json();
        setData(json.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.publishedAt !== '2022-12-20T09:09:00Z' &&
      item.publishedAt !== '2023-01-16T02:50:45Z'
  );

  return (
    <div>
      <div className="container articles-container">
        <Navbar expand="lg" className="border-bottom">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav mr-auto">
              <Nav.Link className="a" href="#">
                Bitcoin
              </Nav.Link>
              <Nav.Link onClick={() => setShowNews(!showNews)}>News</Nav.Link>
              <Nav.Link href="#">Index+</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="container">
        {showNews &&
          filteredData.map((item: Article) => (
            <div key={item.publishedAt} className="article-container">
              <h2>{item.title}</h2>
              {item.urlToImage && <img src={item.urlToImage} alt={item.title} />}
              <p>{item.description}</p>
              <button
                className="button"
                onClick={() => setShowNews(!showNews)}
              >
                {showNews ? 'Close' : 'Read more'}
              </button>
              {showNews && <p>{item.content}</p>}
            </div>
          ))}
      </div>
    </div>
  );
}

export default News;
