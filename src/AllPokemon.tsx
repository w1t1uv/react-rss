import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pokemon } from './Pokemon';
import { urlObject } from './server';

interface pokemonData {
  name: string;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
}

interface responsePokemon {
  name: string;
  url: string;
}

function AllPokemon() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const navigate = useNavigate();
  const url = urlObject.url;

  const [allPokemonData, setAllPokemonData] = useState<pokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`${url}?offset=${(page - 1) * 10}&limit=10`);

        const allPokemonData = await Promise.all(
          response.data.results.map(async (pokemon: responsePokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (!pokemonResponse.ok) {
              throw new Error(`Query execution error : ${pokemonResponse.status}`);
            }
            return pokemonResponse.json();
          })
        );

        setAllPokemonData(allPokemonData);
        console.log(response.data.results);
        setLoading(false);
      } catch (e) {
        console.error(`Error: ${e}`);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [page]);

  const onPageChange = (newPage: number) => {
    query.set('page', newPage.toString());
    navigate(`?${query.toString()}`);
  };

  return (
    <div className="cards">
      {loading && <p className="loading">Loading</p>}
      {!loading &&
        allPokemonData.map((pokemon) => (
          <Link key={pokemon.name} to={`/details/${pokemon.name}`} className="pokemon-card">
            <Pokemon
              key={pokemon.name}
              name={pokemon.name}
              height={pokemon.height}
              isDefault={pokemon.isDefault ? 'Yes' : 'No'}
              order={pokemon.order}
              weight={pokemon.weight}
            />
          </Link>
        ))}
      <div className="wrapper">
        <button
          className="button pagination-button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          prev
        </button>
        <button className="button pagination-button" onClick={() => onPageChange(page + 1)}>
          next
        </button>
      </div>
    </div>
  );
}

export default AllPokemon;
