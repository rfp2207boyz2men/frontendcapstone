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
    <React.Fragment>
    <QandASearch searchQuestion={searchQuestion} />
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
=======
              <div className='qandaButtons'>
                <button
                  className='question-list-button'
                  onClick={handleShowMore}>
                  MORE QUESTIONS
                </button>
                <button
                  className='question-list-button'
                  onClick={handleModal}>
                  ADD A QUESTION +
                </button>
              </div>
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
            </> :
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
<<<<<<< HEAD
                <>
                  <button
                    className='question-list-button'
                    onClick={handleShowLess}>
                    Show Less
=======
                <div className='qandaButtons'>
                  <button
                    className='question-list-button'
                    onClick={handleShowLess}>
                    SHOW LESS
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
                  </button>
                  <button
                    className='question-list-button'
                    onClick={handleModal}>
<<<<<<< HEAD
                    Add a Question +
                  </button>
                </>}
=======
                    ADD A QUESTION +
                  </button>
                </div>}
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
            </>
          }
        </> :
        <>
          <h2>Got a Question? Press the button below!</h2>
          <button
            className='question-list-button'
            onClick={handleModal}>
            ADD A QUESTION +
          </button>
        </>
      }
    </div>
    </React.Fragment>
  )
}

export default QuestionList;