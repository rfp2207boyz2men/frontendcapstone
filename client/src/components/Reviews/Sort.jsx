import React, { useState, useEffect, useContext } from 'react';

const Sort = (props) => {

<<<<<<< HEAD
  return (
    <select className='reviewSort' name='sort' onChange={props.onChange}>
      <option value='helpful'>Helpful</option>
      <option value='newest'>Newest</option>
      <option value='relevant'>Relevant</option>
    </select>
=======
  const [dropDown, setDropDown] = useState(false);

  const handleDropDownEnter = () => {
    setDropDown(true);
  };

  const handleDropDownLeave = () => {
    setDropDown(false);
  };

  const handleClick = (sort) => {
    setDropDown(false);
    props.onChange(sort);
  };

  const capitalizeSort = () => {
    let firstLetter = props.sort.slice(0, 1).toUpperCase();
    let restOfWord = props.sort.slice(1);
    return (<span onMouseEnter={handleDropDownEnter}>{firstLetter + restOfWord}<VscTriangleDown /></span>)
  }

  return (
    <div className='reviewSortSection' onMouseLeave={handleDropDownLeave}>
      <div>{capitalizeSort()}</div>
      {dropDown &&
      <div className='reviewSortDropDown'>
        <p onClick={() => {handleClick('relevant')}}>Relevant</p>
        <p onClick={() => {handleClick('helpful')}}>Helpful</p>
        <p onClick={() => {handleClick('newest')}}>Newest</p>
      </div>}
    </div>
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
  )
};

export default Sort;