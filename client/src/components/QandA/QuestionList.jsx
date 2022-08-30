import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import Parse from '../../parse.js';
import axios from 'axios';
import QandASearch from './QandASearch.jsx';
import RelevantQ from './RelevantQ.jsx'
import './QandA.css';

const QuestionList = (props) => {
  const [filtered, setFiltered] = useState(props.questions);
  const [filteredCount, setFilteredCount] = useState(props.questions.length);
  const [count, setCount] = useState(2);

  let questions = props.questions;
  let filteredQuestions;
  let questionList;
  let showMoreBtn;

  let searchQuestion = (query) => {
    if (query === '' || query === 'undefined') {
      setFiltered(questions);
    }

    filteredQuestions = questions.filter(question =>
      question.question_body.toLowerCase().includes(query.toLowerCase()));

    if (filteredQuestions.length === 0) {
      setFiltered(questions);
      setFilteredCount(questions.length);
    } else {
      setFiltered(filteredQuestions);
      setFilteredCount(filteredQuestions.length);
    }
  }

  let handleShowMore = () => {
    setCount(count + 2);
  }

  let handleShowLess = () => {
    setCount(2);
  }

  if (count < filteredCount) {
    questionList = filtered.slice(0, count).map(question =>
      <RelevantQ question={question}/>)
    showMoreBtn =
      <button
        className='show-more-button'
        onClick={handleShowMore}>
        More Answered Questions
      </button>
  } else {
    questionList = filtered.map(question =>
      <RelevantQ question={question}/>)
    showMoreBtn =
      <button
        className='show-more-button'
        onClick={handleShowLess}>
        Show Less
      </button>
  }

  if ()

  return (
    <div className='question-body'>
      <QandASearch searchQuestion={searchQuestion}/>
      <div className='question-list'>
        {questionList}
      </div>
      {showMoreBtn}
    </div>
  )
}

export default QuestionList;