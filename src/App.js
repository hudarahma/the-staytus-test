import React from 'react';
import ContextProvider from './Context';
import Cards from './Cards'


function App() {

  return (
    
    <ContextProvider>
      <Cards />
    </ContextProvider>
  );

}

export default App;


