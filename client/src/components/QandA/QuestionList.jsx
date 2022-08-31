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
  let questionBody;

  let searchQuestion = (query) => {
    if (query.length <= 2) {
      setFiltered(questions);
      setFilteredCount(questions.length);
    } else {
      filteredQuestions = questions.filter(question =>
        question.question_body.toLowerCase().includes(query.toLowerCase()));
    }

    setFiltered(filteredQuestions);
    setFilteredCount(filteredQuestions.length);
  }

  let handleShowMore = () => {
    setCount(count + 2);
  }

  let handleShowLess = () => {
    setCount(2);
  }

  if (count < filteredCount) {
    questionList = filtered.slice(0, count).map(question =>
      <Question question={question}/>)

    showMoreBtn =
      <button
        className='question-list-button'
        onClick={handleShowMore}>
        More Answered Questions
      </button>
  } else {
    questionList = filtered.map(question =>
      <Question question={question}/>)

    showMoreBtn =
      <button
        className='question-list-button'
        onClick={handleShowLess}>
        Show Less
      </button>
  }

  if (filteredCount) {
    questionBody =
      <div className='question-body'>
        <QandASearch searchQuestion={searchQuestion}/>
        <div className='question-list'>
          {questionList}
        </div>
        {/* if this don't work cause of div issues... toss next to questionList above*/}
        {showMoreBtn}
        <button className='question-list-button'>
          Add a Question +
        </button>
      </div>
  } else {
    questionBody =
      <div className='question-body'>
        <button className='question-list-button'>
          Add a Question +
        </button>
      </div>
  }

  return (
    {questionBody}
  )
}

export default QuestionList;