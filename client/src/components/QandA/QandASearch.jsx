import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import Parse from '../../parse.js';
import axios from 'axios';
import './QandA.css';

class QandASearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
    this.queryUpdate = this.queryUpdate.bind(this);
  }

  queryUpdate(event) {
    if (event.target.value.length > 2) {
      this.setState({
        searchQuery: event.target.value
      })
    }
    this.props.searchQuestion(this.state.searchQuery);
  }

  render() {

    return(
      <div className='qanda-search'>
        <input
          className='qanda-search-input'
          type='search'
          placeholder='Have a question? Search for answers...'
          name='questionQuery'
          onChange={this.queryUpdate}
        />
        <button className='qanda-search-icon'><BiSearch/></button>
      </div>
    )
  }
}

export default QandASearch;