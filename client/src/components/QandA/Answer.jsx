import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import moment from 'moment';
// import '../Reviews/ReviewsStyles.css';
import PhotoOverlay from "../Reviews/PhotoOverlay.jsx";

const Answer = (props) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState('');

  let answerId = props.answer.answer_id;
  let params = `?answer_id=${answerId}`;
  let username = props.answer.answerer_name
  let date = moment(props.answer.date).format('MMM DD[,] YYYY');
  let helpfulBtn;
  let reportBtn;

  let answerIsHelpful = () => {
    setIsHelpful(true);

    let localStorageCopy = JSON.parse(localStorage.getItem('helpfulAnswers'));
    localStorageCopy = JSON.stringify({...localStorageCopy, [answerId] : true});
    localStorage.setItem('helpfulAnswers', localStorageCopy);

    Parse.update(`qa/answers/${answerId}/helpful`, params);
  }

  let answerIsReported = () => {
    setIsReported(true);

    Parse.update(`qa/answers/${answerId}/report`, params);
  }

  if (isHelpful || props.helpfulAnswers[answerId]) {
    helpfulBtn = <u> Yes </u>
  } else {
    helpfulBtn =
      <button
        className='helpful'
        onClick={answerIsHelpful}>
        <u> Yes </u>
      </button>
  }

  if (isReported) {
    reportBtn = <u>Reported</u>
  } else {
    reportBtn =
      <button
        className='report'
        onClick={answerIsReported}>
        <u>Report</u>
      </button>
  }

  let handleClick = (e) => {
    setOverlay(true);
    setClickedPhoto(e.target.src);
  }

  let handleOverlay = () => {
    setOverlay(false);
  }

  let styleBottomBorder = () => {
    if (props.index < props.count - 1 && props.answerCount > 1) {
      return {borderBottom: '1px dotted burlywood'};
    } else {
      return {borderBottom: 'none'};
    }
  };

  return (
    <div className='answer'>
      <div className='answer-line'>
        <strong> A: {props.answer.body}</strong>
        <span>
        {props.answer.photos.length > 0 ?
        props.answer.photos.map((photo) => <img src={photo.url} className='answer-photo' onClick={handleClick} alt='Answer photo thumbnail' key={photo.id}/>) : null}
        </span>
        <small className='user-info'>
          by {username === 'Seller'
          ? <b>{username}</b>
          :username} , {date} | Helpful?
          {helpfulBtn} ({props.answer.helpfulness + (isHelpful ? 1 : 0)}) |
          {reportBtn}
        </small>
      </div>
      <div style={styleBottomBorder()} className='answer-bottom-border'></div>
      {overlay && <PhotoOverlay clickedPhoto={clickedPhoto} onClick={handleOverlay} />}
    </div>
  )
}

export default Answer;