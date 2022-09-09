import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = (props) => {

  return (
    <div className='reviewSearchSection'>
      <input className='reviewSearchBar' type='search' placeholder='Search Reviews' onChange={props.onChange}></input>
      <BiSearch className='reviewSearchBarIcon' />
    </div>
  )
};

export default Search;