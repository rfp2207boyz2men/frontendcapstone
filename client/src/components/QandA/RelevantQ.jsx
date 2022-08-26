import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import Answers from './Answers.jsx';

class RelevantQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuestions: [],
      relevantQuestions: [],
      questionQuery: ''
    };
  }



  render() {
    return(
      <div className='question'>
        <span>
          <h3>Q: {this.props.question.question_body}</h3>
          <p>
              Helpful? <button><u> Yes </u></button> ({this.props.question.question_helpfulness}) | <button><u> Add Answer </u></button>
          </p>
        </span>
        <div className ='answer-list'>
          {/* <Answers answers={this.props.questions.answers} /> */}
        </div>
      </div>
    );
  }
}

export default RelevantQ;