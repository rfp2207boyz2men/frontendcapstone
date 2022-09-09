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
      <BiSearch className='reviewSearchBarIcon' />
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
    </div>
  )
};

export default Search;