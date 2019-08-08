import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GalleryView } from './views/GalleryView';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GalleryView} />
      </Switch>
    </Router>
  );
};

export default App;
