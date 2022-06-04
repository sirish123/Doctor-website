import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';



import MainNavigation from './shared/components/Navigation/MainNavigation';
import Patient from './patients/Patient';
import NewPatient from './patients/NewPatient';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Switch>
        <Route path="/" exact>
         <Patient />
        </Route>
        <Route path="/newPatient" exact>
         <NewPatient />
        </Route>
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
};

export default App;
