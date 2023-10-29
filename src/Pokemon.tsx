import React from 'react';

interface IProps {
  name: string;
  height: number;
  isDefault: string;
  order: number;
  weight: number;
}

export class Pokemon extends React.Component<IProps, unknown> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper pokemon-wrapper">
        <p className="property property-name">Name : {this.props.name}</p>
        <p className="property property-height">Height : {this.props.height}</p>
        <p className="property property-isDefault">Is Default : {this.props.isDefault}</p>
        <p className="property property-order">Order : {this.props.order}</p>
        <p className="property property-weight">Weight : {this.props.weight}</p>
      </div>
    );
  }
}
