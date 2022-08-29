import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import moment from 'moment';
import './QandA.css';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: false,
      reported: false
    };
    this.answerIsHelpful = this.answerIsHelpful.bind(this);
    this.answerIsReported = this.answerIsReported.bind(this);
  }

  answerIsHelpful() {
    this.setState({
      helpful: true
    })
    let answerId = this.props.answer.answer_id;
    let params = `?answer_id=${answerId}`;

    Parse.update(`qa/answers/${answerId}/helpful`, params)
  }

  answerIsReported() {
    this.setState({
      reported: true
    })
    let answerId = this.props.answer.answer_id;
    let params = `?answer_id=${answerId}`;

    Parse.update(`qa/answers/${answerId}/report`, params)
  }

  render() {
    let date = moment(this.props.answer.date).format('MMM DD[,] YYYY')
    let username = this.props.answer.answerer_name;
    let isHelpful = this.state.helpful;
    let helpful;
    let isReported = this.state.reported;
    let report;

    if(isHelpful) {
      helpful = <u> Yes </u>
    } else {
      helpful = <button
        className='helpful'
        onClick={this.answerIsHelpful}>
        <u> Yes </u>
      </button>
    }

    if(isReported) {
      report = <u> Reported </u>
    } else {
      report = <button
        className='report'
        onClick={this.answerIsReported}>
        <u> Report </u>
      </button>
    }

    return (
      <div className='answer'>
        <div className='answer-line'>
          <strong>A: {this.props.answer.body}</strong>
          <small className='user-info'>
            by {username === 'Seller' ? <b>username</b> : username}, {date} | Helpful?
            {helpful}
            ({this.props.answer.helpfulness}) |
            {report}
          </small>
        </div>
      </div>
    )
  }
}

export default Answer;