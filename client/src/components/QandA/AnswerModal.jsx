import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import Parse from '../../parse.js';

const AnswerModal = (props) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  let form;
  let data;
  let questionId = props.questionId;

  let handleSubmit = (event) => {
    event.preventDefault();
    data = {
      body: userAnswer,
      name: nickname,
      email: email,
      // need to add photos
    }

    Parse.create(`qa/questions/${questionId}/answers`, params, data)
      .then((results) => {
        props.getAnswers();
        props.handleModal();
      })
      .catch((error) => {
        alert(error);
      })
  }

  let handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      props.handleModal();
    }
  }

  let handleChange = () => {
    form = event.target;

    if (form.name === 'user-answer') {
      setUserAnswer(form.value);
    } else if (form.name === 'nickname') {
      setNickname(form.value);
    } else if (form.name === 'email') {
      setEmail(form.value);
    }
  }


  return ReactDOM.createPortal(
    <>
      <div
        className='portal-overlay'
        onClick={props.handleModal}
      />
      <div
        className='answer-modal'
        onKeyDown={handleKeyDown}
      >
        <form
          className='answer-form'
          onSubmit={handleSubmit}
        >
          <h2>Submit Your Answer</h2>
          <h3>{props.productName}: {props.question}</h3>
          <h4>Answer: </h4>
          <textarea
            name='user-answer'
            type='text'
            maxLength='1000'
            onChange={handleChange}
            required
          />
          <h4> Nickname: </h4>
          <textarea
            name='nickname'
            type='text'
            maxLength='60'
            placeholder='Example: jack543!'
            onChange={handleChange}
            required
          />
          <small>For privacy reasons, do not use your full name or email address</small>
          <h4> Email address: </h4>
          <textarea
            name='email'
            type='email'
            maxLength='60'
            placeholder='Example: jack@email.com'
            onChange={handleChange}
            required
          />
          <small className='email-small'>For authentication reasons, you will not be emailed</small>
          <input
            type='submit'
            value='Submit'
            onSubmit={handleSubmit}
          />
        </form>

      </div>
    </>, document.getElementById('portal')
  )
}

export default AnswerModal;