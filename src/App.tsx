import React from 'react';
import Navigation from './navigations/Navigation';
import {TokenProvider} from './tokens/TokenContext';

function App(): JSX.Element {
  return (
    <TokenProvider>
      <Navigation />
    </TokenProvider>
  );
}

export default App;
