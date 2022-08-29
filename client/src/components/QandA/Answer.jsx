import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import moment from 'moment';
import './QandA.css';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let date = moment(this.props.answer.date).format('MMM DD[,] YYYY')
    let username = this.props.answer.answerer_name;

    return (
      <div className='answer'>
        <div className='answer-line'>
            <strong>A: {this.props.answer.body}</strong>
          <small className='user-info'>
            by {username === 'Seller' ? <b>username</b> : username}, {date} | Helpful? <button className='helpful'><u> Yes </u></button> ({this.props.answer.helpfulness}) | <button className='report'><u> Report </u></button>
          </small>
        </div>
      </div>
    )
  }
}

export default Answer;