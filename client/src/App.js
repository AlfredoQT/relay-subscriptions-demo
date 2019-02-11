import React, { useState } from 'react';
import ItemListPage from './components/ItemListPage';
import ItemPage from './components/ItemPage';

function App() {
  const [currentId, setCurrentId] = useState(null);

  function handleBack() {
    setCurrentId(null);
  }

  return currentId !== null ? (
    <ItemPage onBack={handleBack} id={currentId} />
  ) : (
    <ItemListPage onItemClick={setCurrentId} />
  );
}

export default App;
