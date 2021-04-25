import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import About from './About/About';
import Appointment from './Appointment/Appointment';
import Privater from './Auth/Privater';

function PrivateApp() {
  const { path } = useRouteMatch()
  return (
    <Privater>
      <Switch>
        <Route path={`${path}/appointment`}>
          <Appointment/>
        </Route>
        <Route path={`${path}/about`}>
          <About />
        </Route>
      </Switch>
    </Privater>
  );
}

export default PrivateApp;
