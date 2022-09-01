// require("dotenv").config();
import CONFIG from '../../../../config.js';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Parse from '../../parse.js';
import { SiIfixit } from 'react-icons/si';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { BsPlusCircle } from 'react-icons/bs';
// import {AdvancedImage} from '@cloudinary/react';
// import {Cloudinary} from "@cloudinary/url-gen";

const Input = (props) => {
  const [textInputs, setTextInputs] = useState({
    summary: '',
    body: '',
    nickname: '',
    email: ''
  });
  const [rating, setRating] = useState(0);
  const [recommendation, setRecommendation] = useState(undefined);
  const [characteristics, setCharacteristics] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const hiddenFileInput = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    //prevState when used in a setState returns the state before invoking the setState
    //Spread operator on an object works such that ({...object}) returns the object
    //  ({...object, key: value}) assigns the object's key to that value
    //  Therefore, assigning [e.target.name] will override the prevState's object key:value pair
    setTextInputs((prevTextInputs) => {
      return ({...prevTextInputs, [e.target.name]: e.target.value})
    });
  };

  const renderStars = () => {
    //Render 5 stars and a clicked star description into a div
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(renderStar(i))
    }
    return (
      <div className='reviewInputStarSection'>
        {stars.map((star) => star)}
        <p>{renderStarIndicator()}</p>
      </div>
    )
  };

  const renderStar = (value) => {
    //Render a full or empty star based on the clicked star
    //Each star has a corresponding value
    if (rating - value >= 0) {
      return <div key={value}><TiStarFullOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    } else {
      return <div key={value}><TiStarOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    }
  };

  const renderStarIndicator = () => {
    //Conditionally render an indicator for the clicked star
    switch(rating) {
      case 1:
        return 'Poor';
        break;
      case 2:
        return 'Fair';
        break;
      case 3:
        return 'Average';
        break;
      case 4:
        return 'Good';
        break;
      case 5:
        return 'Great';
        break;
      default:
        return;
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderRecommendations = () => {
    //Render 2 buttons to recommend/not recommend the product
    return(
      <div className='reviewInputRecommendations'>
        <input type='radio' name='recommendation' value='true' onChange={handleRecommendationClick}></input>
        <p>Yes</p>
        <input type='radio' name='recommendation' value='false' onChange={handleRecommendationClick}></input>
        <p>No</p>
      </div>
    )
  };

  const handleRecommendationClick = (e) => {
    //Convert recommendation from string to boolean
    if (e.target.value === 'true') {
      setRecommendation(true);
    } else {
      setRecommendation(false);
    }
  };

  const renderCharacteristics = (id) => {
    //Render 5 buttons for characteristics with a corresponding value
    let characteristicButtons = [];
    for (let i = 1; i <= 5; i++) {
      characteristicButtons.push(<input type='radio' name={id} value={i} key={id+i} onChange={handleCharacteristicClick}></input>)
    }
    return characteristicButtons.map((characteristic, index) => characteristic);
  };

  const renderCharacteristicsDescriptor = (characteristic) => {
    //Render characteristic descriptions based on the characteristic
    switch(characteristic) {
      case 'Size':
        return ['A size too small', 'A size too wide'];
      case 'Width':
        return ['Too narrow', 'Too wide'];
      case 'Comfort':
        return ['Uncomfortable', 'Perfect'];
      case 'Quality':
        return ['Poor', 'Perfect'];
      case 'Length':
        return ['Runs short', 'Runs long'];
      default:
        return ['Runs tight', 'Runs long'];
    }
  };

  const renderCharacteristicsSection = (characteristic, id) => {
    //Render a characteristic section with a label, 5 buttons, and corresponding descriptions
    return (
      <div className='reviewInputCharacteristicSection' key={characteristic}>
        <h4 className='reviewInputCharacteristicLabel'>{characteristic}</h4>
        <div className='reviewInputCharacteristicButtons'>
          {renderCharacteristics(id)}
        </div>
        <div className='reviewInputCharacteristicsDescriptors'>
          {renderCharacteristicsDescriptor(characteristic, id).map((descriptor) => <p key={descriptor+id}>{descriptor}</p>)}
        </div>
      </div>
    )
  };

  const renderCharacteristicsAggregate = () => {
    //Render all characteristic sections into one div
    let characteristicAggregate = [];
    for (let characteristic in props.characteristics) {
      characteristicAggregate.push(renderCharacteristicsSection(characteristic, props.characteristics[characteristic].id));
    }
    return (
      <div className='reviewInputCharacteristicsAggregate'>
        {characteristicAggregate.map((characteristic, index) => characteristic)}
      </div>
      );
  };

  const handleCharacteristicClick = (e) => {
    //Set the characteristic state as {characteristic_id : value}
    //  Convert value to an integer
    setCharacteristics((prevCharacteristics) => ({...prevCharacteristics, [e.target.name]: parseInt(e.target.value)}));
  };

  const renderPhotos = () => {
    //Render photo gallery up to 5 images (button will disappear after 5 images)
    //Upload button onClick refers to a button that clicks useRef that is referred to by the file input
    //  This allows making a button that's stylized instead of the default file input button
    return(
      <div className='reviewInputPhotoSection'>
        {photos.map((photo) => <img className='reviewInputPhotoThumbnail' src={photo}/>)}
        {photos.length < 5 &&
          <div className='reviewInputPhotoButton' onClick={handlePhotoClick}>
            <BsPlusCircle className='reviewInputPhotoButtonPlus'/>
            <p className='reviewInputPhotoButtonText'>Upload</p>
          </div>}
        <input type='file' style={{display:'none'}} ref={hiddenFileInput} onChange={handlePhotoInput}></input>
      </div>
    )
  };

  const handlePhotoClick = () => {
    //Click the hidden input file button by invoking this function
    hiddenFileInput.current.click();
  }

  const handlePhotoInput = (e) => {
    //Push photo as readable photo to the thumbnail array
    //Push photo as file to the photoData array for submission eventually
    let newPhotos = photos.slice();
    newPhotos.push(URL.createObjectURL(e.target.files[0]))
    setPhotos(newPhotos);
    let newPhotosData = photosData.slice();
    newPhotosData.push(e.target.files[0]);
    setPhotosData(newPhotosData);
  };

  const handleSubmit = () => {
    //First: Validate input field
    //  If fail: create respective error messages
    //Second: Upload photos
    //  If fail: create message indicated failed upload
    //Third: Submit form
    //  If fail: create message indicating failed submit
    event.preventDefault();
    setLoading(true);

    let errors = validateInfo();
    if (errors.length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    uploadAllPhotos()
    .then((photos) => submitForm(photos))
    .then((response) => {
      console.log('success!');
      props.handleOverlay();
      props.getReviews();
    })
    .catch((err) => {
      console.log(err);
      setErrorMessages(['Could not submit form']);
      setLoading(false);
    })
  }

  const uploadAllPhotos = () => {
    //Upload all photos at the same time and get their urls into an array
    return Promise.all(photosData.map((photo) => uploadPhoto(photo)))
    .then((response) => {
      console.log('promise.all checkpoint')
      let photos = [];
      for (let photo of response) {
        photos.push(photo.data.secure_url);
      }
      return photos;
    })
    .catch((err) => {
      console.log(err);
      setPhotos([]);
      setPhotosData([]);
      setErrorMessages(['Photos could not be submitted or photos were invalid']);
      setLoading(false);
    });
  };

  const uploadPhoto = (photo) => {
    //Uploads photo to Cloudinary
    //Make sure to set CLOUDINARY_USER and CLOUDINARY_UPLOAD_PRESET in config.js
    let url = `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY_USER}/image/upload`;
    let upload_preset = CONFIG.CLOUDINARY_UPLOAD_PRESET;

    let formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', upload_preset);
    return Parse.upload(url, formData);
  };

  const submitForm = (photos) => {
    //Submit all form data
    let params = {
      product_id: props.productId,
      rating: rating,
      summary: textInputs.summary,
      body: textInputs.body,
      recommend: recommendation,
      name: textInputs.nickname,
      email: textInputs.email,
      photos: photos,
      characteristics: characteristics
    };
    return Parse.create('reviews', undefined, params)
  };

  const validateInfo = () => {
    //Validate each input field and produce a corresponding error message
    let errors = [];
    if (rating === 0) {
      errors.push('Rating');
    }
    if (recommendation === undefined) {
      errors.push('Recommendation');
    }
    for (let characteristic in props.characteristics) {
      let id = props.characteristics[characteristic].id;
      if (!characteristics[id]) {
        errors.push(characteristic);
      }
    }
    if (textInputs.body.length < 50) {
      errors.push(textInputs.body.length === 0 ? 'Body' : 'Invalid body length');
    }
    if (textInputs.nickname.length === 0) {
      errors.push('Nickname');
    }
    if (!validateEmail(textInputs.email)) {
      errors.push(textInputs.email.length === 0 ? 'Email' : 'Invalid email');
    }

    return errors;
  };

  const validateEmail = (email) => {
    //Validate email to make sure it has a vague semblance of an email format
    // /\S+@\S+\.\S+/                               simple regEx
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/                 should prevent matching multiple @ signs
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <form className='reviewInput' onSubmit={handleSubmit}>
      <SiIfixit className='reviewInputExit' size={30} onClick={props.handleOverlay}/>
      <h2>Write Your Review</h2>
      <h4>About The <u>{props.productName}</u></h4>
      <h3>Overall rating<span style={{color:'red'}}>*</span></h3>
      {renderStars()}
      <h3>Do you recommend this product?<span style={{color:'red'}}>*</span></h3>
      {renderRecommendations()}
      <h3>Characteristics<span style={{color:'red'}}>*</span></h3>
      {renderCharacteristicsAggregate()}
      <h3>Review summary</h3>
      <input type='text' className='reviewTextInput' name='summary' placeholder='Example: Best purchase ever!' maxLength='60' onChange={handleOnChange}></input>
      <h3>Review body<span style={{color:'red'}}>*</span></h3>
      <textarea name='body' placeholder='Why did you like the product or not?' maxLength='1000' onChange={handleOnChange}></textarea>
      {textInputs.body.length < 50
      ?<p>Minimum required characters left: [{50 - textInputs.body.length}]</p>
      :<p>Minimum reached</p>}
      <h3>Upload your photos</h3>
      {renderPhotos()}
      <h3>What is your nickname<span style={{color:'red'}}>*</span></h3>
      <input type='text' className='reviewTextInput' name='nickname' placeholder='Example: jackson11!' maxLength='60' onChange={handleOnChange}></input>
      <p>For privacy reasons, do not use your full name or email address</p>
      <h3>Your email<span style={{color:'red'}}>*</span></h3>
      <input type='text' className='reviewTextInput' name='email' placeholder='Example: jackson11@email.com' maxLength='60' onChange={handleOnChange}></input>
      <p>For authentication reasons, you will not be emailed</p>
      {loading
      ? <button className='reviewSubmit' disabled>Submitting...</button>
      : <button className='reviewSubmit reviewSubmitEnable' type='submit'>Submit review</button>}
      {errorMessages.length >= 1 &&
      <div className='reviewInputErrors'>
        <p>You must enter the following:</p>
        {errorMessages.map((message, index) => <p key={index}>{message}</p>)}
      </div>}
    </form>
  );
};

export default Input;