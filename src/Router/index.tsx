import React from 'react';
import { Route, Switch } from 'wouter';
import { screens } from './routes'
import Modal from './Modal';
import Layout from './Layout';

const App = () => (
  <Layout>
    <>
      <Switch>
        {
          Object.entries(screens).map(([ name, config ]) => (
            <Route
              key={name}
              path={config.path}
              component={config.component}
            />
          ))
        }
      </Switch>
      <Modal />
    </>
  </Layout>
);

export default App;
