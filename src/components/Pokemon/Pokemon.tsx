import React from 'react';
import { IPokemonData } from '../../models/models';

export function Pokemon(props: IPokemonData) {
  return (
    <div className="wrapper pokemon-wrapper">
      <p className="property property-name">Name : {props.name}</p>
      <p className="property property-height">Height : {props.height}</p>
      <p className="property property-isDefault">Is Default : {props.isDefault}</p>
      <p className="property property-order">Order : {props.order}</p>
      <p className="property property-weight">Weight : {props.weight}</p>
    </div>
  );
}
