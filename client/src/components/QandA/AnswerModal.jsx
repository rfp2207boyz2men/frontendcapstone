import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom'
import Parse from '../../parse.js';
import CONFIG from '../../../../config.js';

const AnswerModal = (props) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  let form;
  let data;
  let newPhotos;
  let newPhotosData;
  let photosUrl;
  let formData;
  let uploadPreset;
  let url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  let questionId = props.questionId;

  let handleSubmit = (event) => {
    event.preventDefault();

    uploadAllPhotos();

    data = {
      body: userAnswer,
      name: nickname,
      email: email,
      photos: imageUrls
    }

    Parse.create(`qa/questions/${questionId}/answers`, undefined, data)
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

  let handlePhotoInput = (event) => {
    newPhotos = [...photos]
    newPhotos.push(URL.createObjectURL(event.target.files[0]));
    setPhotos(newPhotos);
    newPhotosData = [...photosData];
    newPhotosData.push(event.target.files[0]);
    setPhotosData(newPhotosData);
  }

  let uploadPhoto = (photo) => {
    formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    return Parse.upload(url, formData);
  }

  let uploadAllPhotos = () => {
    return Promise.all(photosData.map((photo) => uploadPhoto(photo)))
      .then((response) => {
        photosUrl = [];
        for (let photo of response) {
          photosUrl.push(photo.data.secure_url);
        }
        setImageUrls(photosUrl);
      })
      .catch((error) => {
        console.log(error);
        setPhotos([]);
        setPhotosData([]);
      })
  }


  return ReactDOM.createPortal(
    <>
      <div
        className='portal-overlay'
        onClick={props.handleModal}/>
      <div
        className='answer-modal'
        onKeyDown={handleKeyDown}>
        <form
          className='answer-form'
          onSubmit={handleSubmit}>
          <h2>Submit Your Answer</h2>
          <h3>{props.productName}: {props.question}</h3>
          <h4>Answer: </h4>
          <textarea
            name='user-answer'
            type='text'
            maxLength='1000'
            onChange={handleChange}
            required/>
          <h4> Nickname: </h4>
          <textarea
            name='nickname'
            type='text'
            maxLength='60'
            placeholder='Example: jack543!'
            onChange={handleChange}
            required/>
          <small>For privacy reasons, do not use your full name or email address</small>
          <h4> Email address: </h4>
          <textarea
            name='email'
            type='email'
            maxLength='60'
            placeholder='Example: jack@email.com'
            onChange={handleChange}
            required/>
          <small>For authentication reasons, you will not be emailed</small>
          <h4> Upload your photos: </h4>
          <span>
            {photos.length ?
            photos.map((photo) => <img className='photoThumbnail' src={photo}/>) : null
            }
          </span>
          {photos.length < 5 &&
          <input
            name='photos'
            type='file'
            onChange={handlePhotoInput} />
          }
          <input
            type='submit'
            value='Submit'
            onSubmit={handleSubmit}>
          </input>
        </form>
      </div>
    </>, document.getElementById('portal')
  )
}

export default AnswerModal;