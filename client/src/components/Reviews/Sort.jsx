import React, { useState, useEffect, useContext } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

const Sort = (props) => {

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

  // const renderSort = () => {
  //   let sorters = ['relevant', 'helpful', 'newest'];
  //   let visibleSorters = [];
  //   visibleSorters.push(props.sort);
  //   for (let sort of sorters) {
  //     if (!visibleSorters.includes(sort)) {
  //       visibleSorters.push(sort)
  //     }
  //   }
  //   console.log(visibleSorters)
  // }

  return (
    <div className='reviewSortSection' onMouseLeave={handleDropDownLeave}>
      <div>{capitalizeSort()}</div>
      {dropDown &&
        // <select className='reviewSort' name='sort' onChange={props.onChange} onMouseLeave={handleDropDown} onClick={handleDropDown}>
        //   <option value='relevant'>Relevant</option>
        //   <option value='helpful'>Helpful</option>
        //   <option value='newest'>Newest</option>
        // </select>}
        <div className='reviewSortDropDown'>
          <p onClick={() => { handleClick('relevant') }}>Relevant</p>
          <p onClick={() => { handleClick('helpful') }}>Helpful</p>
          <p onClick={() => { handleClick('newest') }}>Newest</p>
        </div>
      }
    </div>
  )
};

export default Sort;