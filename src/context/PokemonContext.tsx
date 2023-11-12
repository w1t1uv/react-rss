import { Dispatch, ReactNode, SetStateAction, createContext, useState, useContext } from 'react';

interface PokemonProviderProps {
  children: React.ReactNode;
}

interface pokemonData {
  name: string;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
}

interface PokemonContextProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  allPokemon: pokemonData[];
  setAllPokemon: Dispatch<SetStateAction<pokemonData[]>>;
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
  const [allPokemon, setAllPokemon] = useState<pokemonData[]>([]);

  const values = {
    value,
    setValue,
    allPokemon,
    setAllPokemon,
  };

  return <pokemonContext.Provider value={values}>{children}</pokemonContext.Provider>;
};
