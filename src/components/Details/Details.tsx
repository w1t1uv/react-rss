import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { urlObject } from '../../server/server';
import { IPokemonData } from '../../models/models';

function Details() {
  const { name } = useParams<{ name: string }>();
  const [pokemonData, setPokemonData] = useState<IPokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const url = urlObject.url;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`${url}/${name}`);
        setPokemonData(response.data);
        setLoading(false);
      } catch (e) {
        console.error(`Error: ${e}`);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name, url]);

  return (
    <div className="card">
      <Link to="/" className="button to-main-button">
        back to main
      </Link>
      {loading && <p className="loading">Loading</p>}
      {!loading && (
        <div className="wrapper pokemon-wrapper">
          <p className="property property-name">Name : {pokemonData?.name}</p>
          <p className="property property-height">Height : {pokemonData?.height}</p>
          <p className="property property-isDefault">
            Is Default : {pokemonData?.isDefault ? 'Yes' : 'No'}
          </p>
          <p className="property property-order">Order : {pokemonData?.order}</p>
          <p className="property property-weight">Weight : {pokemonData?.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Details;
