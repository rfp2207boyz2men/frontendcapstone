import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import Card from './Card.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
    };
  }

  componentDidMount() {
    console.log(this.props.mounted)
    if (this.props.mounted) {
      console.log(this.props.currentProduct)
      Parse.getAll(`products`, `/${this.props.currentProduct.id}/related`)
      .then((data) => {
        console.log(data.data)})
        this.setState({related: data.data})
    }
  }

  render() {
    return (
      <div>
        {this.state.related.map(product => {
          return <Card product = {product}/>
        })}
      </div>
    )
  }
}

export default Related;