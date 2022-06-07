import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Patient from "./patients/Patient";
import NewPatient from "./patients/NewPatient";
import Booking from "./bookings/Booking";
import GetBooking from "./bookings/GetBooking";
import BookingById from "./bookings/BookingById";
import UpdateBooking from "./bookings/UpdateBooking";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <GetBooking />
          </Route>
          <Route path="/book" exact>
            <Patient />
          </Route>
          <Route path="/newpatient" exact>
            <NewPatient />
          </Route>
          <Route path="/history" exact>
            <BookingById />
          </Route>
          <Route path="/booking/:bid" exact>
            <UpdateBooking />
          </Route>
          <Route path="/booking" exact>
            <Booking />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
//
//
