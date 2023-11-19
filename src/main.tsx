import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<p className="error">Something went wrong :/</p>}>
          <PokemonProvider>
            <App />
          </PokemonProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
