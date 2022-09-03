import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import Parse from '../../parse.js';

const QuestionModal = (props) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  let form;
  let data;

  let handleSubmit = (event) => {
    event.preventDefault();
    data = {
      body: userQuestion,
      name: nickname,
      email: email,
      product_id: props.productId
    }

    Parse.create(`qa/questions`, undefined, data)
      .then((results) => {
        props.getQuestions();
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

    if (form.name === 'user-question') {
      setUserQuestion(form.value);
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
        className='question-modal'
        onKeyDown={handleKeyDown}
      >
        <form
          className='question-form'
          onSubmit={handleSubmit}
        >
          <h2>Ask Your Question</h2>
          <h3>About the {props.productName}</h3>
          <h4>Question: </h4>
          <textarea
            name='user-question'
            type='text'
            maxLength='1000'
            placeholder='Why did you like the product or not?'
            onChange={handleChange}
            required
          />
          <h4> Nickname: </h4>
          <textarea
            name='nickname'
            type='text'
            maxLength='60'
            placeholder='Example: jackson11!'
            onChange={handleChange}
            required
          />
          <small>For privacy reasons, do not use your full name or email address</small>
          <h4> Email address: </h4>
          <textarea
            name='email'
            type='email'
            maxLength='60'
            placeholder='Example: jackson@email.com'
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

export default QuestionModal;