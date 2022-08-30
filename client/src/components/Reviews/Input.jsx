import React, { useState, useEffect, useContext, useRef } from 'react';
import Parse from '../../parse.js';
import { SiIfixit } from 'react-icons/si';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { BsPlusCircle } from 'react-icons/bs';

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
  const [error, setError] = useState(false);
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
    //render 5 stars and a clicked star description into a div
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
    //render a full or empty star based on the clicked star
    //each star has a corresponding value
    if (rating - value >= 0) {
      return <div key={value}><TiStarFullOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    } else {
      return <div key={value}><TiStarOutline className='ratingInputStar star' size={20} onClick={()=>{handleStarClick(value)}}/></div>;
    }
  };

  const renderStarIndicator = () => {
    //conditionally render an indicator for the clicked star
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
    //render 2 buttons to recommend/not recommend the product
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
    //convert recommendation from string to boolean
    if (e.target.value === 'true') {
      setRecommendation(true);
    } else {
      setRecommendation(false);
    }
  };

  const renderCharacteristics = (id) => {
    //render 5 buttons for characteristics with a corresponding value
    let characteristicButtons = [];
    for (let i = 1; i <= 5; i++) {
      characteristicButtons.push(<input type='radio' name={id} value={i} key={id+i} onChange={handleCharacteristicClick}></input>)
    }
    return characteristicButtons.map((characteristic, index) => characteristic);
  };

  const renderCharacteristicsDescriptor = (characteristic) => {
    //render characteristic descriptions based on the characteristic
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
    //render a characteristic section with a label, 5 buttons, and corresponding descriptions
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
    //render all characteristic sections into one div
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
    //set the characteristic state as {characteristic_id : value}
    //  convert value to an integer
    setCharacteristics((prevCharacteristics) => ({...prevCharacteristics, [e.target.name]: parseInt(e.target.value)}));
  };

  const renderPhotos = () => {
    //render photo gallery up to 5 images (button will disappear after 5 images)
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
    //click the hidden input file button by invoking this function
    hiddenFileInput.current.click();
  }

  const handlePhotoInput = (e) => {
    let newPhotos = photos.slice();
    newPhotos.push(URL.createObjectURL(e.target.files[0]))
    setPhotos(newPhotos);
    let newPhotosData = photosData.slice();
    newPhotosData.push(e.target.files[0]);
    setPhotosData(newPhotosData);
  };

  const handleSubmit = () => {
    setLoading(true);
    submitForm();
  }

  const submitForm = () => {
    event.preventDefault();

    let hardCodeImageUrl = `https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80`;
    let hardcodedPhotos = [hardCodeImageUrl, hardCodeImageUrl, hardCodeImageUrl];
    let params = {
      product_id: props.productId,
      rating: rating,
      summary: textInputs.summary,
      body: textInputs.body,
      recommend: recommendation,
      name: textInputs.nickname,
      email: textInputs.email,
      photos: hardcodedPhotos,
      // photos: photos,
      characteristics: characteristics
    };
    // console.log(typeof recommendation);
    // console.log(params);

    Parse.create('reviews', undefined, params)
    .then((response) => {
      // console.log(response);
      props.handleOverlay();
      props.getReviews();
    })
    .catch((err) => {
      console.log(err)
      setLoading(false);
    })
  };

  const validateInfo = () => {
    //What to validate:
    //  Any blank fields
    //  Body < 50 characters
    //  Email not in correct email format
    //  Images invalid/fail to upload
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
    </form>
  );
};

export default Input;