import React from 'react';

class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      activeSearch: false,
      page: 1,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <header className="head">
          <h1 className="header">
            Image Search Abstraction Layer
          </h1>
          <h2 className="subhead">
            FreeCodeCamp Back End Certification API project #4
          </h2>
        </header>
        <main className="container">
          <div className="row">
            <div className="card" id="user_stories">
              <h3 className="card__title">User stories:</h3>
              <ul>
                <li>I can get the image URLs, alt text and page urls for a set of images relating to a given search string.</li>
                <li>I can paginate through the responses by adding a ?offset=2 parameter to the URL.</li>
                <li>I can get a list of the most recently submitted search strings.</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <fieldset>
                <input className="input" id="searchInput" placeholder="Search for images" />
                <button className="card__action" id="searchButton">search</button>
              </fieldset>
            </div>
          </div>
          <div className="row">
            <h3 className="subhead center" id="no_results">No Results</h3>
            </div>
        </main>
        <footer className="foot">
          <div className="icon__wrap">
            <a className="github" href="https://github.com/rifkegribenes/image-search-abstraction-layer" target="_blank">
              <img className="github" src="https://cdn.glitch.com/22a70955-ef8c-44b6-9fd7-5377da7be776%2Ficon-github.png?1516058791588" alt="view code on github" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
