import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import './QandA.css';

class RelevantQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
      answers: [],
      helpful: false
    };
    this.questionIsHelpful = this.questionIsHelpful.bind(this);
  }

  questionIsHelpful() {
    this.setState({
      helpful: true
    })
    let questionId = this.props.questions.question_id;
    let params = `?question_id=${questionId}`;

    Parse.update(`qa/questions/${questionId}/helpful`, params)
  }

  componentDidMount() {
    let questionId = this.props.question.question_id;
    let params = `?question_id=${questionId}`;

    Parse.getAll(`qa/questions/${questionId}/answers`, params)
      .then((answers) => {
        let results = answers.data;
        if(results.length > 1) {
          results = results.sort((a,b) => b.helpfulness - a.helpfulness);
          let seller = [];
          seller = results.filter(result => result.answerer_name.toLowerCase() === 'seller');
          return seller.concat(results.filter(result => result.answerer_name.toLowerCase() !== 'seller'));
        } else {
          return results;
        }
      })
      .then((results) => {
        this.setState({
          answers: results.results
        })
      })
  }

  render() {
    let question = this.props.question.question_body;
    let answerList;
    let isHelpful = this.state.helpful;
    let helpful;

    if(this.state.answers.length > 0) {
      answerList = (
        <div className ='answer-list'>
          <AnswerList answers={this.state.answers}/>
        </div>)
    } else {
      answerList = (
        <div className ='no-answer'>
          <strong>Help the Odin Community by providing an answer!</strong>
        </div>
      )
    }

    if(isHelpful) {
      helpful = <u> Yes </u>
    } else {
      helpful = <button
        className='helpful'
        onClick={this.questionIsHelpful}>
        <u> Yes </u>
      </button>
    }

    return(
      <div className='question-set'>
        <div className='question-line'>
          <strong className='question'>Q: {question}</strong>
          <span className = 'question-interaction'> Helpful?
            {helpful}
            ({this.props.question.question_helpfulness}) |
            <button className='add-answer'><u> Add Answer </u></button>
          </span>
        </div>
        {answerList}
      </div>
    );
  }
}

export default RelevantQ;