import React, { useState, useEffect, useContext } from 'react';

import Answer from './Answer.jsx';

const AnswerList = (props) => {
  const [count, setCount] = useState(2);

  let answers = props.answers;
  let answerCount = answers.length;
  let answerList;

  let handleShowMore = () => {
    setCount(count + 2);
  }

  if (count < answerCount) {
    answerList = answers.slice(0, count).map(answer =>
      <Answer answer={answer}/>)
  } else {
    answerList = answers.map(answer =>
      <Answer answer={answer}/>)
  }

  return (
    <div className='answers'>
      {answerList}
      {count > 2 || (count < answerCount && count > 2) &&
      <button onClick={handleShowMore}>Show More Answers</button>}
    </div>
  )
}

export default AnswerList;