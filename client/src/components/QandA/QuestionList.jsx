import React, { useState, useEffect, useContext } from 'react';

import QandASearch from './QandASearch.jsx';
import Question from './Question.jsx'
import QuestionModal from './QuestionModal.jsx';

const QuestionList = (props) => {
  const [filtered, setFiltered] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [count, setCount] = useState(2);
  const [modal, setModal] = useState(false);

  let questions = props.questions
  let questionsCount = questions.length;
  let filteredQuestions;
  let questionList;
  let showMoreBtn;
  let questionBody;

  useEffect(() => {
    setFiltered(props.questions);
    setFilteredCount(props.questions.length);
  }, [props.questions]);

  let searchQuestion = (query) => {
    if (query === undefined || query.length <= 2) {
      setFiltered(questions);
      setFilteredCount(questions.length);
    } else {
      filteredQuestions = questions.filter(question =>
        question.question_body.toLowerCase().includes(query.toLowerCase()));
      if (filteredQuestions === []) {
        setFiltered(filteredQuestions);
        setFilteredCount(1);
      } else {
        setFiltered(filteredQuestions);
        setFilteredCount(filteredQuestions.length);
      }
    }
  }

  let handleShowMore = () => {
    setCount(count + 2);
  }

  let handleShowLess = () => {
    setCount(2);
  }

  let toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  }

  let handleModal = () => {
    setModal(!modal);
    toggleScrollLock();
  }

  return (
    <div className='question-body'>
        {modal &&
        <QuestionModal
          handleModal={handleModal}
          productName={props.productName}
          productId={props.productId}
          getQuestions={props.getQuestions} />
        }
        {questionsCount ?
        <>
          <QandASearch searchQuestion={searchQuestion} />
          {count < filteredCount ?
          <>
            <div className='question-list'>
              {filtered.slice(0, count).map(question =>
              <Question
                key={question.question_id}
                question={question}
                productName={props.productName} />
              )}
            </div>
<<<<<<< HEAD
            <div className='qandaButtons'>
=======
>>>>>>> dev
            <button
              className='question-list-button'
              onClick={handleShowMore}>
              More Answered Questions
            </button>
            <button
              className='question-list-button'
              onClick={handleModal}>
              Add a Question +
            </button>
<<<<<<< HEAD
            </div>
=======
>>>>>>> dev
          </>:
          <>
            <div className='question-list'>
              {filtered.map(question =>
              <Question
                key={question.question_id}
                question={question}
                productName={props.productName} />
              )}
            </div>
            {filteredCount > 2 &&
            <>
              <button
                className='question-list-button'
                onClick={handleShowLess}>
                Show Less
              </button>
              <button
                className='question-list-button'
                onClick={handleModal}>
                Add a Question +
              </button>
            </>}
          </>
          }
        </> :
        <>
          <h2>Got a Question? Press the button below!</h2>
          <button
            className='question-list-button'
            onClick={handleModal}>
            Add a Question +
          </button>
        </>
        }
    </div>
  )
}

export default QuestionList;