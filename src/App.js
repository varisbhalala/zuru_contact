import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { mainRoutes } from './routes'

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div />}>
          <Switch>
            {mainRoutes.map(r => (
              <Route
                key={r}
                exact={r.exact}
                path={r.path}
                component={props => <r.component {...props} />}
              />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
