import React, { useState, useEffect, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import Parse from '../../parse.js';
import axios from 'axios';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalQuestions: [],
      totalAnswers: [],
      relevantQuestions: [],
      relevantAnswers: [],
      questionQuery: ''
    };
  }

  render() {
    return(
      <div className='questions'>
        <h4 className='qanda-heading'>QUESTIONS AND ANSWERS</h4>
        <div>
          <form>
            <input
              type='search'
              placeholder='Have a question? Search for answers...'
              name='questionQuery'
            />
            <button type='submit'>
              <BiSearch />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default QandA;