import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';

import QuestionList from './QuestionList.jsx';
// import './QandA.css';

const QandA = (props) => {
  const [questions, setQuestions] = useState([]);

  let productName = props.selectedProduct.name;
  let productId = props.selectedProduct.id;
  let params =`?product_id=${productId}&count=100`
  let results;

  let getQuestions = () => {
    Parse.getAll(`qa/questions`, params)
      .then((questions) => {
        results = questions.data.results;
        return results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
      })
      .then((results) => {
        setQuestions(results);
      })
  }

  useEffect(() => {
    console.log('Q AND A PROCCED')
    getQuestions();
  }, []);

  return (
    <div className='qanda' onClick={props.trackClick}>
      <h2 className='qanda-heading'>QUESTIONS AND ANSWERS</h2>
      <QuestionList
        questions={questions}
        productId={productId}
        productName={productName}
        getQuestions={getQuestions} />
    </div>
  )
}

export default QandA;