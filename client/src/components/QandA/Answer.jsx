import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import moment from 'moment';

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
        <div>
          <span>
            <strong>A: </strong> {this.props.answer.body}
          </span>
          <small className='user-info'>
            by {username === 'Seller' ? <b>username</b> : username}, {date} | Helpful? <button><u> Yes </u></button> ({this.props.answer.helpfulness}) | <button><u> Report </u></button>
          </small>
        </div>
      </div>
    )
  }
}

export default Answer;