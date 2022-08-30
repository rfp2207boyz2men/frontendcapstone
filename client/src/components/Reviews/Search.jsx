import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = (props) => {

  return (
    <div>
      <input type='text' placeholder='search reviews' onChange={props.onChange}></input>
      <BiSearch />
    </div>
  )
};

export default Search;