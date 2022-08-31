import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';

import AnswerList from './AnswerList.jsx';
import './QandA.css';

const Question = (props) => {
  const [answers, setAnswers] = useState([]);
  const [answersCount, setAnswersCount] = useState(0);
  const [count, setCount] = useState(2);
  const [isHelpful, setHelpful] = false;

  let question = props.question.question_body;
  let questionId = props.questions.question_id;
  let params = `?question_id=${questionId}`;
  let seller;
  let results;
  let answerList;
  let helpfulBtn;

  let questionIsHelpful = () => {
    setHelpful(true);

    Parse.update(`qa/questions/${questionId}/helpful`, params);
  }

  useEffect(() => {
    Parse.getAll(`qa/questions/${questionId}/answers`, params)
      .then((answers) => {
        results = answers.data;
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
    })
  }, []);

}

export default Question;