import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";


import Patient from "./patients/Patient";
import NewPatient from "./patients/NewPatient";
import BookingForm from "./bookings/BookingForm";
import GetBooking from "./bookings/GetBooking";
import BookingById from "./bookings/BookingById";
import UpdateBooking from "./bookings/UpdateBooking";
import Navbar from "./shared/components/Navigation/Navbar";

const App = () => {
  return (
    <Router>
     <Navbar />
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
          <Route path="/booking/:kid/:did" exact>
            <BookingForm />
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
