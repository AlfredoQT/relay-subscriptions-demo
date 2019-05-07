import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import InventoryScreen from './components/InventoryScreen';
import ApplicantsScreen from './components/ApplicantsScreen';
import RequestsScreen from './components/RequestsScreen';
import RequestScreen from './components/RequestScreen';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import 'moment/locale/es';

moment.locale('es');

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={InventoryScreen} />
          <Route exact path="/aplicantes" component={ApplicantsScreen} />
          <Route exact path="/pedidos" component={RequestsScreen} />
          <Route exact path="/pedidos/:id" component={RequestScreen} />
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
}

export default App;
