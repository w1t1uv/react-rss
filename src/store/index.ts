import { configureStore } from '@reduxjs/toolkit';
import { pokemonSliceReducer } from './pokemon.slice';
import { pokemonApi } from './pokemon.api';

export const store = configureStore({
  reducer: {
    pokemon: pokemonSliceReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
