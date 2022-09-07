import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = (props) => {

  return (
<<<<<<< HEAD
    <div className='reviewSearchSection'>
      <input className='reviewSearchBar' type='search' placeholder='Search Reviews' onChange={props.onChange}></input>
      <BiSearch className='reviewSearchBarIcon'/>
=======
    <div>
      <input type='search' placeholder='search reviews' onChange={props.onChange}></input>
      <BiSearch />
>>>>>>> dev
    </div>
  )
};

export default Search;