import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Parse from '../../parse.js';
import PhotoOverlay from './PhotoOverlay.jsx';
import { GrCheckmark } from 'react-icons/gr';

const Tile = (props) => {
  const [localClick, setLocalClick] = useState(false);
  const [clickedHelpful, setClickedHelpful] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState('');

  const renderName = () => {
    let name = props.review.reviewer_name;
    let date = moment(props.review.date).format('MMM DD[,] YYYY');
    name = `${name}, ${date}`;
    return name;
  };

  const renderStars = () => {
    return props.renderStars(props.review.rating).map((star => star))
  };

  const parseBody = () => {
    //render body (or response) to allow paragraphs
    let parsedBody = props.review.body.replaceAll('\n\n', '\n');
    if (parsedBody.length > 250 && !showMore) {
      parsedBody = `${parsedBody.slice(0, 251)}...`;
      parsedBody = parsedBody.split('\n');
      return parsedBody.map((body, index) => highlightText(body, index));
    } else {
      parsedBody = parsedBody.split('\n');
      return parsedBody.map((body, index) => highlightText(body, index));
    }
  };

  const highlightText = (body, index) => {
    //If no search query, return the paragraph
    if (props.searchQuery === '') {
      return (<p key={body + index + props.review.review_id}>{body}</p>);
    }

    let search = new RegExp(`(${props.searchQuery})`, 'i'); //Regex to split case-insensitive, preserve query text
    let splitText = body.split(search);
    //If search query not found in paragraph, return paragraph
    if (splitText.length === 1) {
      return (<p key={body + index + props.review.review_id}>{body}</p>);
    } else {
      return (<p key={body + index + props.review.review_id}>{formatHighlight(splitText)}</p>);
    }
  };

  const formatHighlight = (splitText) => {
    let text = [];
    let i = 0;

    for (let chunk of splitText) {
      if (chunk.toLowerCase() === props.searchQuery.toLowerCase()) {
        text.push(<mark key={i}>{chunk}</mark>);
        i++;
      } else {
        text.push(chunk);
      }
    }

    return text;
  };

  const parseResponse = () => {
    let parsedResponse = props.review.response.replaceAll('\n\n', '\n');
    parsedResponse = parsedResponse.split('\n');
    return parsedResponse.map((response, index) => <p key={response + props.review.review_id + index}>{response}</p>);
  }

  const handleShowMore = () => {
    setShowMore(true);
  }

  const renderHelpful = () => {
    // render message whether user voted review as helpful or not
    //  will render based on current session
    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulReviews'));
    if (localStorageCopy[props.review.review_id] === true) {
      return(
        <p>You set this review as: Helpful ({props.review.helpfulness + (localClick ? 1 : 0)})</p>
      )
    // }
    // } else if (localStorageCopy[props.review.review_id] === false) {
      // return(
        // <p>You set this review as: Not helpful ({props.review.helpfulness})</p>
      // )
    } else {
      return(
        <div className='reviewHelpful'>
          <p>Helpful?</p>
          <p onClick={()=>handleHelpful(true)}><u>Yes</u></p>
          {/* <p onClick={()=>handleHelpful(false)}><u>No</u></p> */}
          <p>({props.review.helpfulness})</p>
        </div>
      )
    }
  };

  const handleHelpful = (value) => {
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

  const handlePhotoClick = (e) => {
    setClickedPhoto(e.target.src);
    setOverlay(true)
  };

  const handleOverlay = () => {
    setOverlay(false);
  };

  const reportReview = () => {
    //update API to report review
    //  then get new set of reviews
    Parse.update(`reviews/`, `${props.review.review_id}/report`)
    .then(() => props.handleReport(props.index))
    .catch((err) => console.log(err));
  };

  return (
    <div className='reviewTile'>
      <div className='reviewUserInfo'>
        <p>{renderName()}</p>
<<<<<<< HEAD
=======
        {props.review.recommend && <p><GrCheckmark /> I recommend this product</p>}
>>>>>>> dev
      </div>
      <div className='ratingStars'>{renderStars()}</div>
      <h3><b>{props.review.summary}</b></h3>
      <div className='reviewBodySection'>
        {parseBody()}
<<<<<<< HEAD
        {(props.review.body.length > 250 && !showMore) && <p className='reviewTileShowMore' onClick={handleShowMore}><u>Show more...</u></p>}
=======
        {(props.review.body.length > 250 && !showMore) && <p onClick={handleShowMore}><u>Show more...</u></p>}
>>>>>>> dev
        {props.review.photos.length >= 1 &&
        <div className='reviewPhotoThumbnailSection'>
          {props.review.photos.map((photo, index) => <img src={photo.url} className='reviewPhotoThumbnail' onClick={handlePhotoClick} key={index}/>)}
        </div>}
        {props.review.response &&
        <div className='reviewResponse'>
          <span><b>Response:</b></span>
          <p>{parseResponse()}</p>
        </div>}
<<<<<<< HEAD
        {props.review.recommend && <p><GrCheckmark className='reviewCheckmark'/> I recommend this product</p>}
=======
>>>>>>> dev
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