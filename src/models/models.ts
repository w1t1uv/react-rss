export interface responsePokemon {
  name: string;
  url: string;
}

export interface IPokemonData {
  name: string;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
}

export interface ServerResponse<T> {
  total_count: number;
  incomplete_results: false;
  items: T[];
}
