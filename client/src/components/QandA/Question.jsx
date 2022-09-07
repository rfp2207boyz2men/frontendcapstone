import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';

import AnswerList from './AnswerList.jsx';
import AnswerModal from './AnswerModal.jsx';


const Question = (props) => {
  const [answers, setAnswers] = useState([]);
  const [answersCount, setAnswersCount] = useState(0);
  const [count, setCount] = useState(2);
  const [isHelpful, setHelpful] = useState(false);
  const [modal, setModal] = useState(false);

  let question = props.question.question_body;
  let questionId = props.question.question_id;
  let questionHelpfuless = props.question.question_helpfulness;
  let params = `?question_id=${questionId}&count=100`;
  let seller;
  let results;
  let answerList;
  let helpfulBtn;

  let getAnswers = () => {
    Parse.getAll(`qa/questions/${questionId}/answers`, params)
    .then((results) => {
      results = results.data.results;

      if (results.length > 1) {
        results = results.sort((a, b) => b.helpfulness - a.helpfulness);

        seller = results.filter(result => result.answerer_name.toLowerCase() === `seller`);
        return seller. concat(results.filter(result => result.answerer_name.toLowerCase() !== 'seller'));
      } else {
        return results;
      }
    })
    .then((results) => {
      setAnswers(results);
      setAnswersCount(results.length);
    })
  }

  let questionIsHelpful = () => {
    setHelpful(true);

    Parse.update(`qa/questions/${questionId}/helpful`, params);
  }

  let handleModal = () => {
    setModal(!modal);
  }

  useEffect(() => {
    getAnswers();
  }, [isHelpful]);

  if (isHelpful) {
    helpfulBtn = <u>Yes</u>
  } else {
    helpfulBtn =
      <button
        className='helpful'
        onClick={questionIsHelpful}>
        <u>Yes</u>
      </button>
  }

  return (
    <div className='question-set'>
      <div className='question-line'>
        <strong className='question'>Q: {question}</strong>
        {modal &&
        <AnswerModal
          handleModal={handleModal}
          questionId={questionId}
          question={question}
          getAnswers={getAnswers}
          productName={props.productName} />
        }
        <span className='question-interaction'> Helpful?
          {helpfulBtn} ({questionHelpfuless}) |
          <button
            className='add-answer'
            onClick={handleModal}>
            <u>Add Answer</u>
          </button>
        </span>
      </div>
      {answersCount ?
      <div className='answer-list'>
        <AnswerList answers={answers} />
      </div> :
      <div className='no-answer'>
        <strong>Help the Odin Community by providing an answer!</strong>
      </div>}
    </div>
  )
}

export default Question;