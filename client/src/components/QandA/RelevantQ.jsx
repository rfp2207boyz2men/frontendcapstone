import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import Answers from './Answers.jsx';

class RelevantQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2
    };
    console.log(this.props.question)
  }

  render() {



    return(
      <div className='question'>
        <h3>Q: {this.props.question.question_body}
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