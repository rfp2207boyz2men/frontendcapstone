import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import moment from 'moment';

import './QandA.css';

const Answer = (props) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isReported, setIsReported] = useState(false);

  let answerId = props.answer.answer_id;
  let params = `?answer_id=${answerId}`;
  let username = props.answer.answerer_name
  let date = moment(props.answer.date).format('MMM DD[,] YYYY');
  let helpfulBtn;
  let reportBtn;

  let answerIsHelpful = () => {
    setIsHelpful(true);

    Parse.update(`qa/answers/${answerId}/helpful`, params);
  }

  let answerIsReported = () => {
    setIsReported(true);

    Parse.update(`qa/answers/${answerId}/report`, params);
  }

  if (isHelpful) {
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

  return (
    <div className='answer'>
      <div className='answer-line'>
        <strong> A: {props.answer.body}</strong>
        <small className='user-info'>
          by {username === 'Seller'
          ? <b>username</b>
          : username} , {date} | Helpful?
          {helpfulBtn} ({props.answer.helpfulness}) |
          {reportBtn}
        </small>
      </div>
    </div>
  )
}

export default Answer;