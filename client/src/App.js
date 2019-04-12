import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import InventoryScreen from './components/InventoryScreen';
import ApplicantsScreen from './components/ApplicantsScreen';
import RequestsScreen from './components/RequestsScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={InventoryScreen} />
        <Route exact path="/aplicantes" component={ApplicantsScreen} />
        <Route exact path="/pedidos" component={RequestsScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
