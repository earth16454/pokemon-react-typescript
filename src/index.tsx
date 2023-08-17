import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonDetails from './components/PokemonDetails';
import PokemonTable from './components/PokemonTable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/table',
    element: <PokemonTable />
  },
  {
    path: 'details/:id',
    element: <PokemonDetails />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
