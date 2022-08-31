import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import './QandA.css';

const QandA = (props) => {
  const [questions, setQuestions] = useState([]);

  // let productId = props.selectedProduct.id;
  // let params =`?product_id=${productId}`
  let params = `?product_id=40347`;
  let results;

  useEffect(() => {
    Parse.getAll(`qa/questions`, params)
      .then((questions) => {
        results = questions.data.results;
        return results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
      })
      .then((results) => {
        setQuestions(results);
      })
  }, []);

  return (
    <div className='qanda'>
      <h2 className='qanda-heading'>QUESTIONS AND ANSWERS</h2>
      <QuestionList questions={questions}/>
    </div>
  )
}

export default QandA;