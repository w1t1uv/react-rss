import React from 'react';
import { urlObject } from './server';
import { Pokemon } from './Pokemon';

interface pokemonData {
  name: string;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
}

interface IState {
  allPokemon: pokemonData[];
  isLoaded: boolean;
}

interface responsePokemon {
  name: string;
  url: string;
}

export class AllPokemon extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      allPokemon: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const url = urlObject.url;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Query execution error : ${response.status}`);
      }
      const data = await response.json();
      const { results } = data;

      const allPokemonData = await Promise.all(
        results.map(async (pokemon: responsePokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) {
            throw new Error(`Query execution error : ${pokemonResponse.status}`);
          }
          return pokemonResponse.json();
        })
      );

      this.setState({
        allPokemon: allPokemonData,
        isLoaded: true,
      });
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  render() {
    const isLoading = this.state.isLoaded;
    const pokemonList = this.state.allPokemon;

    return (
      <div>
        {isLoading &&
          pokemonList.map((pokemon) => (
            <Pokemon
              key={pokemon.name}
              name={pokemon.name}
              height={pokemon.height}
              isDefault={pokemon.isDefault ? 'Yes' : 'No'}
              order={pokemon.order}
              weight={pokemon.weight}
            />
          ))}
      </div>
    );
  }
}
