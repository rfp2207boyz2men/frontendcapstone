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
      answers: []
    };
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
        console.log(this.state.answers)
      })
  }

  render() {
    let question = this.props.question.question_body;
    let answerList;

    if(this.state.answers.length > 0) {
      answerList = (
        <div className ='answer-list'>
          <AnswerList answers={this.state.answers}/>
        </div>)
    } else {
      answerList = (
        <div>
          <strong>Help the Odin Community by providing an answer!</strong>
        </div>
      )
    }

    return(
      <div className='question'>
        <div>
          <span>
            <strong>Q: {question}</strong>
            Helpful? <button><u> Yes </u></button> ({this.props.question.question_helpfulness}) | <button><u> Add Answer </u></button>
          </span>
        </div>
        {answerList}
      </div>
    );
  }
}

export default RelevantQ;