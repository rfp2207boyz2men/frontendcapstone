import React, { useState, useEffect, useContext } from 'react';

import Answer from './Answer.jsx';

const AnswerList = (props) => {
  const [count, setCount] = useState(2);
  const [helpfulAnswers, setHelpfulAnswers] = useState({});

  let answers = props.answers;
  let answerCount = answers.length;
  let answerList;

  useEffect(() => {
    setHelpfulAnswers(JSON.parse(localStorage.getItem('helpfulAnswers')));
  }, []);

  let handleShowMore = () => {
    setCount(answerCount);
  }

  let handleShowLess = () => {
    setCount(2);
  }

  if (count < answerCount) {
    answerList = answers.slice(0, count).map((answer, index) =>
      <Answer key={answer.answer_id} answer={answer} count={count} index={index} answerCount={answerCount} helpfulAnswers={helpfulAnswers}/>)
  } else {
    answerList = answers.map((answer, index) =>
      <Answer key={answer.answer_id} answer={answer} count={count} index={index} answerCount={answerCount} helpfulAnswers={helpfulAnswers}/>)
  }

  return (
    <div className='answers'>
      {answerList}
      {(count < answerCount && count >= 2) &&
      <button className='showAnswersButton' onClick={handleShowMore}>MORE ANSWERS</button>}
      {(count >= answerCount && answerCount > 2) &&
      <button className='showAnswersButton' onClick={handleShowLess}>COLLAPSE ANSWERS</button>}
    </div>
  )
}

export default AnswerList;