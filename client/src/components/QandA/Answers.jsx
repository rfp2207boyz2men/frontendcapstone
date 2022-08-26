import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import axios from 'axios';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let qId = this.props.qId;

    return(
      <div className='answer-list'>
        <h3> A:

        </h3>
      </div>
    );
  }
}

export default Answers;