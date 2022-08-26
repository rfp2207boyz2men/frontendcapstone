import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import Parse from '../../parse.js';
import axios from 'axios';
import RelevantQ from './RelevantQ.jsx'

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      count: 4,
      questionQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let params = `?product_id=40347`;
    Parse.getAll(`qa/questions`, params)
      .then((questions) => {
        let results = questions.data.results;
        results.sort((a,b) => b.question_helpfulness - a.question_helpfulness);
        this.setState({
          questions: results
        });
        console.log(this.state.questions);
      })
  }

  handleChange(event) {
    this.setState({
      questionQuery: event.target.value
    })
  }

  render() {
    return(
      <div className='questions'>
        <h2 className='qanda-heading'>QUESTIONS AND ANSWERS</h2>
        <div>
          <form>
            <input
              type='search'
              placeholder='Have a question? Search for answers...'
              name='questionQuery'
              onChange={this.handleChange}
            />
            <button type='submit'>
              <BiSearch />
            </button>
          </form>
        </div>
        <div className='question-list'>
          {this.state.questions.map(question => (
            <RelevantQ question={question} />
          ))}
        </div>
      </div>
    );
  }
}

export default QandA;