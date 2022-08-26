import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';
import Answer from './Answer.jsx';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 2
    };
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  handleShowMore() {
    this.setState({
      showMore: this.state.count + 2
    })
  }

  render() {
    let answerList;
    let listLen = this.props.answers.length;

    if(this.state.showMore) {
      answerList = this.props.answers.map(answer =>
        <Answer answer={answer} />
      )
    } else {
      answerList = this.props.answers.slice(0, this.state.count).map(answer =>
        <Answer answer={answer} />
      )
    }

    return(
      <div className='answers'>
        {answerList}
        {listLen > 2 || (this.state.count < listLen && listLen > 2) &&
          <button onClick={this.handleShowMore}>Show More answers</button>}
      </div>
    );
  }
}

export default AnswerList;