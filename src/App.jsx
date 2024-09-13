import logo from './logo.svg';
import { useEffect } from 'react'
import './App.css'
import Main from './pages/Main'
import { Provider } from 'react-redux'
import {store, persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  useEffect(() => {
    console.clear();
  });

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Main/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
