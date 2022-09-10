import React, { useState, useEffect, useContext } from 'react';
import QandASearch from './QandASearch.jsx';
import Question from './Question.jsx'
import QuestionModal from './QuestionModal.jsx';

const QuestionList = (props) => {
  const [filtered, setFiltered] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [count, setCount] = useState(2);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulQuestions, setHelpfulQuestions] = useState({});

  let questions = props.questions
  let questionsCount = questions.length;
  let filteredQuestions;
  let questionList;
  let showMoreBtn;
  let questionBody;

  useEffect(() => {
    setFiltered(props.questions);
    setFilteredCount(props.questions.length);
    setHelpfulQuestions(JSON.parse(localStorage.getItem('helpfulQuestions')));
  }, [props.questions]);

  let searchQuestion = (query) => {
    if (query === undefined || query.length <= 2) {
      setFiltered(questions);
      setFilteredCount(questions.length);
      setSearchQuery('');
    } else {
      filteredQuestions = questions.filter(question =>
        question.question_body.toLowerCase().includes(query.toLowerCase()));
      if (filteredQuestions === []) {
        setFiltered(filteredQuestions);
        setFilteredCount(1);
        setSearchQuery(query);
      } else {
        setFiltered(filteredQuestions);
        setFilteredCount(filteredQuestions.length);
        setSearchQuery(query);
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

  let renderNoSearchedQuestions = () => {
    let style = {alignSelf: 'flex-start'}
    return (
      <>
        <h2>No questions found with the current search.</h2>
        <button
          className='question-list-button'
          onClick={handleModal}>
          ADD A QUESTION +
        </button>
      </>
    )
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
                    productName={props.productName}
                    searchQuery={searchQuery}
                    helpfulQuestions={helpfulQuestions} />
                )}
              </div>
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
            </> :
            <>
              <div className='question-list'>
                {filtered.map(question =>
                  <Question
                    key={question.question_id}
                    question={question}
                    productName={props.productName}
                    searchQuery={searchQuery}
                    helpfulQuestions={helpfulQuestions} />
                )}
              </div>
              {filteredCount > 2 &&
                <div className='qandaButtons'>
                  <button
                    className='question-list-button'
                    onClick={handleShowLess}>
                    SHOW LESS
                  </button>
                  <button
                    className='question-list-button'
                    onClick={handleModal}>
                    ADD A QUESTION +
                  </button>
                </div>}
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
      {(questionsCount && filtered.length === 0) && renderNoSearchedQuestions()}
    </div>
    </React.Fragment>
  )
}

export default QuestionList;