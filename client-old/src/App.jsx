import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';

const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="*" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }

export default App;
