import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = (props) => {

  return (
<<<<<<< HEAD
    <div>
      <input type='search' placeholder='search reviews' onChange={props.onChange}></input>
      <BiSearch />
=======
    <div className='reviewSearchSection'>
      <input className='reviewSearchBar' type='search' placeholder='Search Reviews' onChange={props.onChange}></input>
      <BiSearch className='reviewSearchBarIcon'/>
>>>>>>> eda63e3ae1dde64faa1919a5f15a2804b13a8bc4
    </div>
  )
};

export default Search;