import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Parse from '../../parse.js';
import PhotoOverlay from './PhotoOverlay.jsx';
import { GrCheckmark } from 'react-icons/gr';

const Tile = (props) => {
  const [localClick, setLocalClick] = useState(false);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState('');

  let renderName = () => {
    let name = props.review.reviewer_name;
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

  let renderHelpful = () => {
    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulReviews'));
    if (localStorageCopy[props.review.review_id] === true) {
      return(
        <p>You set this review as: Helpful</p>
      )
    } else if (localStorageCopy[props.review.review_id] === false) {
      return(
        <p>You set this review as: Not helpful</p>
      )
    } else {
      return(
        <div className='reviewHelpful'>
          <p>Helpful?</p>
          <p onClick={()=>handleHelpful(true)}><u>Yes</u></p>
          <p onClick={()=>handleHelpful(false)}><u>No</u></p>
        </div>
      )
    }

  };

  let handleHelpful = (value) => {
    let review_id = props.review.review_id;
    //TODO: Invoke Parse.update to update helpfulness in API

    //ISSUE: The helpful indicator applies to the index of the tile rather than the specific tile itself
    //  Somehow save status to review_id instead?
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify({}))
    }

    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulReviews'));
    localStorageCopy = ({...localStorageCopy, [props.review.review_id]: value})
    // console.log(localStorageCopy);

    localStorage.setItem('helpfulReviews', JSON.stringify(localStorageCopy));
    setLocalClick(true);
  };

  let handlePhotoClick = (e) => {
    setClickedPhoto(e.target.src);
    setOverlay(true)
  };

  let handleOverlay = () => {
    setOverlay(false);
  };

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
          {props.review.photos.map((photo, index) => <img src={photo.url} className='reviewPhotoThumbnail' onClick={handlePhotoClick} key={index}/>)}
        </div>}
        {props.review.response &&
        <div className='reviewResponse'>
          <span><b>Response:</b></span>
          <p>{parseBody('response')}</p>
        </div>}
      </div>
      <div className='reviewInteractions'>
        {renderHelpful()}
        <p className='reviewReport' onClick={reportReview}><u>Report</u></p>
      </div>
      {overlay && <PhotoOverlay clickedPhoto={clickedPhoto} onClick={handleOverlay} />}
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