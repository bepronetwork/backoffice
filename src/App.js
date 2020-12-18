import React from 'react';
import './App.less';

import Routes from 'routes';

import ViewportProvider from 'contexts/viewport';

function App() {
  return (
    <ViewportProvider>
      <Routes />
    </ViewportProvider>
  );
}

export default App;
