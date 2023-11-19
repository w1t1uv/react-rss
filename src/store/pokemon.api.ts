import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPokemonData } from '../models/models';

interface ServerResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2',
  }),
  endpoints: (builder) => ({
    searchAllPokemon: builder.query<ServerResponse, number>({
      query: (page) => `pokemon?offset=${(page - 1) * 10}&limit=10`,
    }),
    searchPokemon: builder.query<IPokemonData, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useSearchAllPokemonQuery, useSearchPokemonQuery } = pokemonApi;
