import React, { useState, useEffect, useContext } from 'react';

const Sort = (props) => {

  return (
    <select className='reviewSort' name='sort' onChange={props.onChange}>
      <option value='helpful'>Helpful</option>
      <option value='newest'>Newest</option>
      <option value='relevant'>Relevant</option>
    </select>
  )
};

export default Sort;