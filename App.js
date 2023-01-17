import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";
import { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';


function App() {
  const [data, setData] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://newsapi.org/v2/everything?q=bitcoin&apiKey=d54212ef837b4c72bb09987f5b0434b1'
      );
      const json = await response.json();
      setData(json.articles);
    }
    fetchData();
  }, []);

  const filteredData = data.filter(item => item.publishedAt !== '2022-12-20T09:09:00Z' && item.publishedAt !== '2023-01-16T02:50:45Z');

  return (
    <div>
      <div className="container articles-container">
<Navbar expand="lg" className="border-bottom">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="navbar-nav mr-auto">
      <Nav.Link href="#">Bitcoin</Nav.Link>
      <Nav.Link href="#">News</Nav.Link>
      <Nav.Link href="#">Index+</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </div>
    <div className="container">
    {filteredData.map((item) => (
      <div key={item.publishedAt} className="article-container">
        <h2>{item.title}</h2>
        <img src={item.urlToImage} alt={item.title} />
        <p>{item.description}</p>
        <button className="button" onClick={() => setShowContent(!showContent)}>
          {showContent ? 'Close' : 'Read more'}
        </button>
        {showContent && <p>{item.content}</p>}
      </div>
    ))}
      </div>
      </div>
);
}

export default App;