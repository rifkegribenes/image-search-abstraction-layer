import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      activeSearch: false,
      page: 1,
      data: '',
      recent: '',
      error: false,
      errorMsg: '',
      preview: false
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const rootUrl = 'http://localhost:8080';
    const response = await fetch(`${rootUrl}/api/recent`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  onChange(e) {
    const newState = { ...this.state }
    newState.searchTerm = e.target.value;
    this.setState(newState);
  }

  clearInput = () => {
    const newState = { ...this.state }
    newState.searchTerm = '';
    newState.error = false;
    newState.activeSearch = false;
    newState.preview = false;
    this.setState(newState);
  }

  search() {
    // for local testing; change this to glitch root URL when deployed
    const rootUrl = 'http://localhost:8080';
    const searchTerm = this.state.searchTerm;
    const newState = { ...this.state }
    newState.activeSearch = true;
    this.setState(newState, () => {
      axios.get(`${rootUrl}/api/search/${searchTerm}?offset=1`)
      .then((resp) => {
        console.log(resp.data);
        const newState = { ...this.state }
        newState.data = { ...resp.data };
        if (!newState.data.items.length) {
          newState.error = true;
          newState.errorMsg = 'Sorry, no Results :(';
        }
        this.setState(newState, () => {
          const newState = { ...this.state }
          newState.preview = true;
          this.setState(newState);
        });
      })
      .catch((error) => {
        console.log(error);
        const newState = { ...this.state }
        newState.error = true;
        newState.errorMsg = error;
        this.setState(newState);
      });
    });


  }

  render() {
    const { activeSearch, error, errorMsg } = this.state;
    const { query, offset, baseUrl, items } = this.state.data;
    let thumbnails;
    if (items) {
      thumbnails = items.map(item => (
          <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.snippet} key={item.id}>
            <img className="image" src={item.thumbnail} alt={item.snippet} />
          </a>
        ));
    }
    return (
      <div className="App">
        <header className="head">
          <p>{this.state.response}</p>
          <h1 className="header">
            Image Search Abstraction Layer
          </h1>
          <h2 className="subhead">
            FreeCodeCamp Back End Certification API project #4
          </h2>
        </header>
        <main className="container">
          <div className="row">
            <div className={activeSearch ? 'hidden' : 'card'} id="user_stories">
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
                <input
                  className="input"
                  id="searchInput"
                  placeholder="Search for images"
                  value={this.state.searchTerm}
                  onChange={e => this.onChange(e)}
                />
                <button
                  className="card__action"
                  id="searchButton"
                  onClick={() => this.search()}
                  >
                  search
                </button>
              </fieldset>
              <div id="search_actions" className={activeSearch ? 'visible' : 'hidden'}>
                <span className="info">Search again</span>
                <button
                  id="clear_active_search"
                  className="close"
                  onClick={() => this.clearInput()}
                >&times;</button>
              </div>
            </div>
          </div>
          {activeSearch &&
            <div className="row">
              <h3 className="subhead center">
                { this.state.preview ? `Search results for ${query}` : "Loading..." }
              </h3>
              { this.state.preview &&
                <div id="results" className={error ? 'card' : 'card results'}>
                  {items.length ? thumbnails :
                    <div className="center error">
                      {errorMsg || 'No results'}
                    </div>
                  }
                  {offset > 10 &&
                    <a
                      id="prev"
                      className="arrow"
                      href={`${baseUrl}?offset=${+offset - 10}`}
                      alt="previous 10 results"
                      title="previous 10 results"
                    >
                      <div className="prev"> &#9664; </div>
                    </a>
                  }
                  <a
                    id="next"
                    className="arrow"
                    href={`${baseUrl}?offset=${+offset + 10}`}
                    alt="next 10 results"
                    title="next 10 results"
                  >
                    <div className="next"> &#9654; </div>
                  </a>
                </div>
              }
            </div>
          }
        </main>
        <footer className="foot">
          <div className="icon__wrap">
            <a className="github" href="https://github.com/rifkegribenes/image-search-abstraction-layer" target="_blank" rel="noopener noreferrer">
              <img className="github" src="https://cdn.glitch.com/22a70955-ef8c-44b6-9fd7-5377da7be776%2Ficon-github.png?1516058791588" alt="view code on github" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
