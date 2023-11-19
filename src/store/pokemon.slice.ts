import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { IPokemonData } from '../models/models';

interface PokemonState {
  name: string;
  allPokemon: IPokemonData[];
}

const initialState: PokemonState = {
  name: '',
  allPokemon: [],
};

const pokemonSlice: Slice<PokemonState> = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    saveValue: (state: PokemonState, actions: PayloadAction<string>) => {
      state.name = actions.payload;
      localStorage.setItem('query', state.name);
    },
    setAllPokemon: (state, actions: PayloadAction<IPokemonData[]>) => {
      state.allPokemon = actions.payload;
    },
  },
});

export const pokemonSliceActions = pokemonSlice.actions;
export const pokemonSliceReducer = pokemonSlice.reducer;
