import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import Answers from './Answers.jsx';

class RelevantQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2,
    };
  }

  componentDidMount() {
    let questionId = this.props.question.question_id;
    let params = `?question_id=${questionId}`;

    Parse.getAll(`qa/questions/${questionId}/answers`, params)
      .then((answers) => {
        let results = answers.data;
        console.log(results);
      })
  }

  render() {
    let question = this.props.question.question_body;

    return(
      <div className='question'>
        <h3>Q: {question}
          <span>
            Helpful? <button><u> Yes </u></button> ({this.props.question.question_helpfulness}) | <button><u> Add Answer </u></button>
          </span>
        </h3>
        <div className ='answer-list'>
          {this.props.question.answers !== {} && (<Answers answers={this.props.question.answers} qId={this.props.question.question_id}/>)}
        </div>
      </div>
    );
  }
}

export default RelevantQ;