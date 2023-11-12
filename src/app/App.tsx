import React from 'react';
import { PokemonSearch } from '../components/PokemonSearch/PokemonSearch';
import { Routes, Route, Outlet } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import Details from '../components/Details/Details';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PokemonSearch />} />
        <Route path="/details/:name" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
