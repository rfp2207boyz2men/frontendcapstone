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
    let parsedBody = props.review[type].replaceAll('\n\n', '\n');
    parsedBody = parsedBody.split('\n');
    return parsedBody.map((body, index) => <p key={body + props.review.review_id + index}>{body}</p>)
  };

  let renderHelpful = () => {
    // render message whether user voted review as helpful or not
    //  will render based on current session
    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulReviews'));
    if (localStorageCopy[props.review.review_id] === true) {
      return(
        <p>You set this review as: Helpful ({props.review.helpfulness + (localClick ? 1 : 0)})</p>
      )
    } else if (localStorageCopy[props.review.review_id] === false) {
      return(
        <p>You set this review as: Not helpful ({props.review.helpfulness})</p>
      )
    } else {
      return(
        <div className='reviewHelpful'>
          <p>Helpful?</p>
          <p onClick={()=>handleHelpful(true)}><u>Yes</u></p>
          <p onClick={()=>handleHelpful(false)}><u>No</u></p>
          <p>({props.review.helpfulness})</p>
        </div>
      )
    }
  };

  let handleHelpful = (value) => {
    //save review_id to localStorage so it saves helpful vote on page refresh
    //setLocalClick used to change a state to re-render tile
    if (value) {
      Parse.update(`reviews/`, `${props.review.review_id}/helpful`)
      .then(() => console.log('helpful submit'))
      .catch((err) => console.log(err));
    }

    let review_id = props.review.review_id;

    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulReviews'));
    localStorageCopy = ({...localStorageCopy, [props.review.review_id]: value})
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
    //update API to report review
    //  then get new set of reviews
    //  can refactor to just splice the filteredReviews instead of doing an API call?
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