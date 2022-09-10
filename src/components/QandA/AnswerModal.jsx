import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactDOM from 'react-dom'
import Parse from '../../parse.js';
import CONFIG from '../../../../config.js';
import { BsPlusCircle } from 'react-icons/bs';

const AnswerModal = (props) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const hiddenFileInput = useRef(null);

  let form;
  let data;
  let newPhotos;
  let newPhotosData;
  let photosUrl;
  let formData;
  let uploadPreset;
  let url = `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_USER}/image/upload`;
  let questionId = props.questionId;

  const handlePhotoClick = () => {
    hiddenFileInput.current.click();
  }

  let handleSubmitCheck = (event) => {
    event.preventDefault();
    if (photos.length === 0) {
      handleSubmit(event);
    } else {
      uploadAllPhotos(event);
    }
  }

  let handleSubmit = (event, photos = []) => {
    data = {
      body: userAnswer,
      name: nickname,
      email: email,
      photos: photos
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
    formData.append('upload_preset', CONFIG.CLOUDINARY_UPLOAD_PRESET);

    return Parse.upload(url, formData);
  }

  let uploadAllPhotos = (event) => {
    return Promise.all(photosData.map((photo) => uploadPhoto(photo)))
      .then((response) => {
        photosUrl = [];
        for (let photo of response) {
          photosUrl.push(photo.data.secure_url);
        }
        return photosUrl;
      })
      .then((photosUrl) => {
        handleSubmit(event, photosUrl);
      })
      .catch((error) => {
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
          onSubmit={handleSubmitCheck}>
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
          <div className='answerInputPhotoSection'>
            {photos.length < 5 &&
              <div className='reviewInputPhotoButton' onClick={handlePhotoClick}>
                <BsPlusCircle className='reviewInputPhotoButtonPlus'/>
                <p className='reviewInputPhotoButtonText'>Upload</p>
              </div>}
            {photos.length ?
            photos.map((photo) => <img className='answerPhotoThumbnail' src={photo}/>) : null
            }
          </div>
          {photos.length < 5 &&
          <input
            name='photos'
            type='file'
            style={{display:'none'}}
            ref={hiddenFileInput}
            onChange={handlePhotoInput} />
          }
          <input
            type='submit'
            value='Submit'
            >
          </input>
        </form>
      </div>
    </>, document.getElementById('portal')
  )
}

export default AnswerModal;