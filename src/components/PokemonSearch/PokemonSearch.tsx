import React, { useCallback, useEffect, useState } from 'react';
import { urlObject } from '../../server/server';
import SearchBar from '../SearchBar/SearchBar';
import { Pokemon } from '../Pokemon/Pokemon';
import ErrorButton from '../ErrorBoundary/ErrorButton';
import AllPokemon from '../AllPokemon/AllPokemon';
import { PokemonProvider, usePokemonContext } from '../../context/PokemonContext';

export function PokemonSearch() {
  const { value, setValue } = usePokemonContext();
  const [name, setName] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [searchDone, setSearchDone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<boolean>(false);

  const handleChange = useCallback(() => {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const newValue = input.value;
    setValue(newValue);
    setName('');
    setHeight(0);
    setIsDefault(false);
    setOrder(0);
    setWeight(0);
    setSearchDone(false);
    setLoading(false);
    setQueryError(false);
    if (!newValue) {
      localStorage.setItem('query', '');
    }
  }, []);

  const handleClick = useCallback(() => {
    const formattedValue = value.trim().toLowerCase();
    if (!formattedValue.length) return;
    localStorage.setItem('query', formattedValue);
    search(formattedValue);
  }, [value]);

  async function search(name: string) {
    setLoading(true);
    const url = urlObject.url;
    try {
      const response = await fetch(`${url}/${name}`);
      if (!response.ok) {
        setQueryError(true);
        throw new Error(`Query execution error : ${response.status}`);
      }
      const data = await response.json();
      setValue(data.name);
      setName(data.name);
      setHeight(data.height);
      setIsDefault(data.isDefault);
      setOrder(data.order);
      setWeight(data.weight);
      setSearchDone(true);
      setLoading(false);
      setQueryError(false);
      localStorage.setItem('state', JSON.stringify(data));
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  useEffect(() => {
    const storedQuery = localStorage.getItem('query');
    const storedState = localStorage.getItem('state');
    if (storedQuery && storedState) {
      const state = JSON.parse(storedState);
      setValue(storedQuery);
      setSearchDone(true);
      setName(state.name);
      setHeight(state.height);
      setIsDefault(state.isDefault);
      setOrder(state.order);
      setWeight(state.weight);
    }
  }, []);

  return (
    <div>
      <SearchBar value={value} onValueChange={handleChange} onButtonClick={handleClick} />
      <ErrorButton />
      {queryError && <p className="error">There is no such thing as a Pokemon :/</p>}
      {loading && !queryError && <p className="loading">Loading</p>}
      {searchDone && !queryError && (
        <Pokemon
          name={name}
          height={height}
          isDefault={isDefault ? 'Yes' : 'No'}
          order={order}
          weight={weight}
        />
      )}
      {!value && !queryError && <AllPokemon />}
    </div>
  );
}
