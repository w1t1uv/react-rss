import React, { Dispatch, SetStateAction, createContext, useState, useContext } from 'react';
import { IPokemonData } from '../models/models';

interface PokemonProviderProps {
  children: React.ReactNode;
}

interface PokemonContextProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  allPokemon: IPokemonData[];
  setAllPokemon: Dispatch<SetStateAction<IPokemonData[]>>;
}

const defaultContext: PokemonContextProps = {
  value: '',
  setValue: () => {},
  allPokemon: [],
  setAllPokemon: () => {},
};

export const pokemonContext = createContext<PokemonContextProps>(defaultContext);

export const usePokemonContext = () => {
  return useContext(pokemonContext);
};

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [value, setValue] = useState<string>('');
  const [allPokemon, setAllPokemon] = useState<IPokemonData[]>([]);

  const values = {
    value,
    setValue,
    allPokemon,
    setAllPokemon,
  };

  return <pokemonContext.Provider value={values}>{children}</pokemonContext.Provider>;
};
