import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { GrCheckmark } from 'react-icons/gr';


const List = (props) => {

  // let renderStars = () => {
  //   let rating = props.review.rating;
  //   while (rating > 0) {

  //   }
  // };

  let renderName = () => {
    console.log(props.review);
    let name = props.review.reviewer_name;
    // let date = props.review.date;
    let date = moment(props.review.date).format('MMM DD[,] YYYY');
    name = `${name}, ${date}`;
    return name;
  };

  return (
    <div className='reviewTile'>
      <div className='ratingStars'>{props.renderStars(props.review.rating).map((star) => star)}{props.review.rating}</div>
      <p>{renderName()}</p>
      <h3>{props.review.summary}</h3>
      <p>{props.review.body}</p>
      {props.review.response && <div className='ratingResponse'>
        <span><b>Response:</b></span>
        <p>{props.review.body}</p>
      </div>}
      {props.review.recommend && <p><GrCheckmark/> I recommend this product</p>}
      <p>Helpful? <span><u>Yes</u></span> ({props.review.helpfulness}) | <span><u>Report</u></span></p>
    </div>
  )
}

export default List;

/*
body: "i love it sometimes sometimes i do not they are okay"
date: "2022-07-22T00:00:00.000Z"
helpfulness: 2
photos: []
rating: 3
recommend: true
response: null
review_id: 1275918
reviewer_name: "averagerater"
summary: "They are average"
*/