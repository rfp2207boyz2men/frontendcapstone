import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Parse from '../../parse.js';
import { GrCheckmark } from 'react-icons/gr';

const Tile = (props) => {
  // useEffect(() => console.log(props.review))

  let renderName = () => {
    let name = props.review.reviewer_name;
    // let date = props.review.date;
    let date = moment(props.review.date).format('MMM DD[,] YYYY');
    name = `${name}, ${date}`;
    return name;
  };

  let renderStars = () => {
    return props.renderStars(props.review.rating).map((star => star))
  };

  let parseBody = (type) => {
    //render body (or response) to allow paragraphs

    // let bodyChunks = [];
    // let parsedBody = props.review.body.replaceAll('\n\n', '\n');
    // bodyChunks = parsedBody.split('\n');
    let parsedBody = props.review[type].replaceAll('\n\n', '\n');
    parsedBody = parsedBody.split('\n');
    return parsedBody.map((body, index) => <p key={body + props.review.review_id + index}>{body}</p>)
  };

  // return (
  //   <div className='reviewTile'>
  //     <div className='ratingStars'>{renderStars()}</div>
  //     <p>{renderName()}</p>
  //     <h3><b>{props.review.summary}</b></h3>
  //     <p>{props.review.body}</p>
  //     {props.review.response && <div className='reviewResponse'>
  //       <span><b>Response:</b></span>
  //       <p>{props.review.body}</p>
  //     </div>}
  //     {props.review.recommend && <p><GrCheckmark/> I recommend this product</p>}
  //     <p>Helpful? <span><u>Yes</u></span> ({props.review.helpfulness}) | <span><u>Report</u></span></p>
  //     {props.review.photos.map((photo, index) => <img src={photo.url} className='reviewPhotoThumbnail' key={index}/>)}
  //   </div>
  // )

  let reportReview = () => {
    Parse.update(`reviews/`, `${props.review.review_id}/report`)
    .then(() => props.getReviews())
    .catch((err) => console.log(err));
  };

  return (
    <div className='reviewTile'>
      <div className='reviewUserInfo'>
        <p>{renderName()}</p>
        {props.review.recommend && <p><GrCheckmark /> I recommend this product</p>}
      </div>
      <div className='ratingStars'>{renderStars()}</div>
      <h3><b>{props.review.summary}</b></h3>
      <div className='reviewBodySection'>
        {parseBody('body')}
        {props.review.photos.length >= 1 &&
        <div className='reviewPhotoThumbnailSection'>
          {props.review.photos.map((photo, index) => <img src={photo.url} className='reviewPhotoThumbnail' key={index}/>)}
        </div>}
        {props.review.response &&
        <div className='reviewResponse'>
          <span><b>Response:</b></span>
          <p>{parseBody('response')}</p>
        </div>}
      </div>
      <div className='reviewInteractions'>
        <div className='reviewHelpful'>
          <p>Helpful?</p>
          <p><u>Yes</u></p>
          <p><u>No</u></p>
        </div>
        <p className='reviewReport' onClick={reportReview}><u>Report</u></p>
      </div>
    </div>
  )
}

export default Tile;

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