import React from 'react';
import { Provider } from 'react-redux';

import Routers from './routes';

// @ts-ignore
export default ({ store }) => (
  <Provider store={store}>
    <Routers />
  </Provider>
);
