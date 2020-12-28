import React from 'react';
import './App.less';

import Routes from 'routes';

import ViewportProvider from 'contexts/viewport';
import CurrencyProvider from 'contexts/currency';

function App() {
  return (
    <ViewportProvider>
      <CurrencyProvider>
        <Routes />
      </CurrencyProvider>
    </ViewportProvider>
  );
}

export default App;
